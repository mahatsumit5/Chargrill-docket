import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Concert_One } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
const conConcert_One = Concert_One({
  weight: ["400"],
  subsets: ["latin"],
});
import Link from "next/link";
import {
  Book,
  Dock,
  Hamburger,
  History,
  House,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
const links = [
  {
    href: "/",
    label: "Home",
    icon: <House size={16} className="text-primary" />,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} className="text-primary" />,
  },
  {
    href: "/order",
    label: "Orders",
    icon: <Book size={16} className="text-primary" />,
  },
  {
    href: "/users",
    label: "Users",
    icon: <Users size={16} className="text-primary" />,
  },
  {
    href: "/items",
    label: "Items",
    icon: <Hamburger size={16} className="text-primary" />,
  },
  {
    href: "/history",
    label: "History",
    icon: <History size={16} className="text-primary" />,
  },
];
export function AppSidebar() {
  const { setTheme } = useTheme();
  return (
    <Sidebar className="  border-r border-primary/10 ">
      <SidebarHeader className="bg-background border-b flex  justify-between p-3">
        <p
          className={`${conConcert_One.className} text-3xl text-primary flex items-center gap-2 font-bold`}
        >
          <Dock />
          Docker
        </p>
      </SidebarHeader>
      <SidebarContent draggable={true} className="bg-background border-b">
        <SidebarGroup>
          <ul className="flex gap-2 flex-col">
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                <li
                  key={item.href}
                  className="font-bold text-sm text-foreground flex gap-2 items-center  hover:bg-accent p-3 hover:scale-125 transition-all duration-200 border rounded-md cursor-pointer"
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
