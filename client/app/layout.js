import Copyright from "@/components/Copyright";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Storio",
  description: "Your Files. Your Space. Your Storio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className=" bg-white px-6 py-12 text-gray-900 flex flex-col justify-between">
          <div className="max-w-6xl mx-auto w-full">
            <Navigation/>
            {children}
            </div>
        </div>
        <Copyright/>
      </body>
    </html>
  );
}
