import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { PageTransition } from "@/components/layout/page-transition";
import { BackToTop } from "@/components/layout/back-to-top";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { PwaRegister } from "@/components/layout/pwa-register";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={jakarta.variable}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <ScrollProgress />
        <div className="sticky top-0 z-40">
          <Topbar />
          <Header />
        </div>
        <main id="konten-utama" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <MobileMenu />
        <BackToTop />
        <PwaRegister />
        <ScrollReveal />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        </ThemeProvider>
      </body>
    </html>
  );
}
