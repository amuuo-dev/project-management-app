"use client";

import Link from "next/link";
import { Settings, User, Grid, Calendar, Icon } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Define a mapping of icon names to components
const icons: Record<string, Icon> = { Settings, User, Grid, Calendar };

interface SidebarLinkProps {
  link: {
    link: string;
    icon: keyof typeof icons; // Ensures icon is one of the valid keys
  };
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link }) => {
  const pathname = usePathname();
  const isActive = pathname === link.link;

  // Ensure TypeScript recognizes the icon correctly
  const IconComponent = icons[link.icon];

  return (
    <Link href={link.link}>
      <IconComponent
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
