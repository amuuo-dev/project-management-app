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
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="h-full w-full flex items-center justify-between">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default AuthRootLayout;
