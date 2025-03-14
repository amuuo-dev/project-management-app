import "../../../styles/globals.css";
import GlassPane from "@/components/GlassPane";
import { ReactNode } from "react";

interface ChildrenProps {
  children: ReactNode;
}

const AuthRootLayout = ({ children }: ChildrenProps) => {
  return (
    <html lang="en">
      <head />
      <body className="h-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default AuthRootLayout;
