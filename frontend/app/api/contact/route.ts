import { NextResponse } from "next/server";
import { submitContactLead } from "../../actions/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitContactLead(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to create lead" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, leadId: result.leadId },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request payload" },
      { status: 500 }
    );
  }
}
