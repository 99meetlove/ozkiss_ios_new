// app/layout.js
import "./globals.css";
import NotificationProvider from "@/components/notifications/NotificationProvider";

export const metadata = {
  title: "ozkiss",
  description: "Luxury booking platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* GLOBAL REALTIME NOTIFICATION LISTENER */}
        <NotificationProvider />

        {/* MAIN APP CONTENT */}
        {children}
      </body>
    </html>
  );
}
