import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // required
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{ style: { background: "#000000", color: "#fff" } }}
        />
      </body>
    </html>
  );
}
