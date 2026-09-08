"use server";

import { headers } from "next/headers";
import { createAdminClient } from "../../lib/supabase/admin";
import { createClient } from "../../lib/supabase/server";
import { revalidatePath } from "next/cache";
import { contactFormRateLimiter } from "../../lib/rate-limit";

export type SubmitLeadInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  source?: string;
  landing_page?: string;
  utm?: Record<string, string>;
  honeypot?: string; // Bot trap field
};

export type SubmitLeadResult = {
  success: boolean;
  leadId?: string;
  error?: string;
};

export async function submitContactLead(
  input: SubmitLeadInput
): Promise<SubmitLeadResult> {
  try {
    // 1. Anti-spam Honeypot Check: if bot fills this invisible field, reject immediately
    if (input.honeypot && input.honeypot.trim().length > 0) {
      console.warn("Spam bot detected via honeypot field. Discarding submission.");
      return {
        success: false,
        error: "Submission could not be processed.",
      };
    }

    // 2. IP-based Sliding Window Rate Limiting (5 requests per 10 mins per IP)
    let clientIp = "127.0.0.1";
    try {
      const headerList = await headers();
      const forwardedFor = headerList.get("x-forwarded-for");
      const realIp = headerList.get("x-real-ip");
      if (forwardedFor) {
        clientIp = forwardedFor.split(",")[0].trim();
      } else if (realIp) {
        clientIp = realIp.trim();
      }
    } catch {
      // In testing or environments without request context, fallback to default
    }

    const rateLimit = contactFormRateLimiter.check(clientIp);
    if (!rateLimit.success) {
      return {
        success: false,
        error: `Too many submissions from your connection. Please wait ${rateLimit.resetInSeconds} seconds before sending another enquiry.`,
      };
    }

    // 3. Validation & Sanitization
    const trimmedName = input.name?.trim();
    const trimmedEmail = input.email?.trim().toLowerCase();
    const trimmedMessage = input.message?.trim();

    if (!trimmedName) {
      return { success: false, error: "Name is required." };
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return { success: false, error: "A valid email address is required." };
    }

    if (!trimmedMessage) {
      return { success: false, error: "Please provide a message or project details." };
    }

    // Attempt to use service role admin client first (bypasses any RLS edge-cases)
    // Fall back to server client if service role key is not configured
    let supabase: any;
    try {
      supabase = createAdminClient();
    } catch {
      supabase = await createClient();
    }

    const contactFields: Record<string, unknown> = {
      name: trimmedName,
      email: trimmedEmail,
    };

    if (input.phone?.trim()) {
      contactFields.phone = input.phone.trim();
    }

    if (input.company?.trim()) {
      contactFields.company = input.company.trim();
    }

    const leadPayload = {
      contact_fields: contactFields,
      service: input.service?.trim() || null,
      budget: input.budget?.trim() || null,
      message: trimmedMessage,
      source: input.source?.trim() || "website_contact_form",
      landing_page: input.landing_page?.trim() || "/",
      utm: input.utm && typeof input.utm === "object" ? input.utm : {},
      status: "new",
    };

    const { data, error } = await supabase
      .from("leads")
      .insert(leadPayload)
      .select("id")
      .single();

    if (error) {
      console.error("Error creating lead in database:", error);
      return {
        success: false,
        error: error.message || "Unable to save lead in database.",
      };
    }

    const leadId = data?.id;

    // Record initial lead event if leadId exists (non-blocking)
    if (leadId) {
      try {
        await supabase.from("lead_events").insert({
          lead_id: leadId,
          action: "lead_created",
          metadata: {
            source: input.source || "website_contact_form",
            service: input.service || null,
            budget: input.budget || null,
            ip: clientIp !== "127.0.0.1" ? clientIp : undefined,
          },
        });
      } catch (eventErr) {
        console.warn("Failed to record lead_event (ignoring):", eventErr);
      }

      // Record admin notification (non-blocking)
      try {
        await supabase.from("notifications").insert({
          type: "new_lead",
          recipient: "admin",
          lead_id: leadId,
          status: "pending",
        });
      } catch (notifErr) {
        console.warn("Failed to create notification record (ignoring):", notifErr);
      }
    }

    // Refresh admin dashboards and lead lists
    revalidatePath("/admin");
    revalidatePath("/admin/leads");

    return {
      success: true,
      leadId,
    };
  } catch (err) {
    console.error("Unexpected error in submitContactLead:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to process lead submission.",
    };
  }
}
