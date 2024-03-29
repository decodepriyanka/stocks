import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header/page";
import Providers from "./providers";
import { CompanyProvider } from "./CompanyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Top gainers, losers, and most actively traded US tickers",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CompanyProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </CompanyProvider>
      </body>
    </html>
  );
}
