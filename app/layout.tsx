import type { Metadata } from "next";
import { Manrope as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/provider/sessionProvider";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// ******** you can change this metadata information with yours
export const metadata: Metadata = {
  title: "Nerdspace",
  description: "Nerd Space is a community app where curious minds come together to connect, learn, and create. Whether you're into coding, design, science, or just passionate about learning new things, it's the perfect space to collaborate with like-minded people.",

  // ********** you can find the favicons in /public folder
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Remove the head and link tags */}
      <body
        className={cn(
          "min-h-screen bg-neutral-900 selection:bg-purple-500/40 selection:text-purple-200 text-neutral-500 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          {children}
          <Toaster position="top-right" />
        </Provider>
      </body>
    </html>
  );
}
