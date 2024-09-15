import "./globals.css";
import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-900 text-gray-100">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
