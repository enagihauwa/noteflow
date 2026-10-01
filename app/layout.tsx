import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import { themeBootstrapScript } from "@/lib/theme-constants";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-serif",
});

export const metadata: Metadata = {
  title: "NoteFlow",
  description: "Capture it. Find it. Manage it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={robotoSerif.variable} suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint, so a dark-mode visitor
            never sees a white flash. See lib/theme-constants.ts. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript() }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
