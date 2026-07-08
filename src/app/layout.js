import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.scss";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jbmono",
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem('rc-theme');if(t!=='dark'&&t!=='light'){t='light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export const metadata = {
  title: "Distributor Portal | RetailConnect",
  description: "RetailConnect Distributor Portal (Inventory & Orders)",
};

import { ToastProvider } from "../components/ui/Toast/ToastProvider";

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${sora.variable} ${jakarta.variable} ${jbmono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
