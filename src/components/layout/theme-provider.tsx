"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Penyedia dark mode: class pada <html>, mengikuti preferensi sistem. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
