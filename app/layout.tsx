import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/resume";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.shortName} — ${profile.role}`,
  description: `${profile.summary} ${profile.focus}`,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.shortName} — ${profile.role}`,
    description: profile.summary,
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

// Applied before first paint so theme and density never flash.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;var s=localStorage.getItem('density');if(s==='comfortable')d.dataset.density=s;var p=localStorage.getItem('palette');if(/^(zinc|slate|sage|mocha)$/.test(p))d.dataset.palette=p;}catch(e){d.dataset.theme='dark'}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="bg-scene" aria-hidden="true">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="orb orb-c" />
          <div className="bg-dots" />
          <div className="noise" />
        </div>
        {children}
      </body>
    </html>
  );
}
