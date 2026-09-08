"use client";

import { useTheme } from "../theme-provider";
import Navbar from "../components/Navbar";
import ContactUs from "../pages/contactUs";
import Footer from "../components/Footer";

export default function ContactPageClient() {
  const { isDark, toggleDark } = useTheme();

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#0a0f1e" : "#ffffff",
      }}
    >
      <Navbar isDark={isDark} />
      <main className="pt-10">
        <ContactUs isDark={isDark} />
      </main>
      <Footer isDark={isDark} onToggleDark={toggleDark} />
    </div>
  );
}
