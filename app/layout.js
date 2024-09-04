import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "./_components/Header";

export const metadata = {
  title: {
    template: "%s - Tree Group Hotel",
    default: "Welcome - Tree Group Hotel",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Germany, surrounded by beautiful mountains and dark forests",
};

// children is all page.js
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} antialiased relative bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className='flex-1 px-8 py-12 grid'>
          <main className='max-w-7xl mx-auto w-full'>{children}</main>
        </div>
      </body>
    </html>
  );
}
