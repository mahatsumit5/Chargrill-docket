import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Concert_One } from "next/font/google";
import { UserButton, SignedIn } from "@clerk/nextjs";
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
  Ship,
  ShoppingBag,
  Users,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const links = [
  {
    href: "/home",
    label: "Home",
    icon: <House size={16} />,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  {
    href: "/order",
    label: "Orders",
    icon: <Book size={16} />,
  },
  {
    href: "/users",
    label: "Users",
    icon: <Users size={16} />,
  },
  {
    href: "/items",
    label: "Items",
    icon: <Hamburger size={16} />,
  },
  {
    href: "/history",
    label: "History",
    icon: <History size={16} />,
  },
  {
    href: "/cart",
    label: "Cart",
    icon: <ShoppingBag size={16} />,
  },
];
export function AppSidebar() {
  const { state } = useSidebar();
  const Display: Record<typeof state, React.ReactNode> = {
    collapsed: <CollapsedSidebarContent />,
    expanded: <ExpandedSideBarContent />,
  };
  return (
    <Sidebar
      className="bg-background border-r-2"
      variant="inset"
      collapsible="icon"
    >
      {Display[state]}
      <SidebarFooter className="bg-background">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
const ExpandedSideBarContent = () => {
  const pathname = usePathname();
  return (
    <>
      <SidebarHeader className="   flex  justify-between py-3 bg-background ">
        <p
          className={`${conConcert_One.className} text-3xl text-primary flex items-center gap-2 font-bold `}
        >
          <Ship />
          Docker
        </p>
      </SidebarHeader>
      <SidebarContent draggable={true} className=" bg-background">
        <SidebarGroup>
          <ul className="flex gap-2 flex-col">
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                <li
                  key={item.href}
                  className={`font-bold text-sm flex gap-2 items-center  p-3   cursor-pointer hover:text-muted-foreground  ${
                    pathname.includes(item.href)
                      ? "text-background-secondary-foreground border-primary border-l-4 bg-background-secondary rounded-r-full"
                      : ""
                  } `}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
};
const CollapsedSidebarContent = () => {
  const pathname = usePathname();
  return (
    <>
      <SidebarHeader className="flex justify-center items-center bg-background ">
        <p className={` text-5xl text-primary  `}>
          <Ship />
        </p>
      </SidebarHeader>
      <SidebarContent draggable={true} className=" bg-background pt-5">
        <SidebarGroup>
          <ul className="flex gap-2 flex-col">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={` w-full flex justify-center   gap-2 items-center bg-background-secondary hover:bg-secondary rounded-md p-2   cursor-pointer  ${
                  pathname.includes(item.href)
                    ? "text-primary  border-primary/85 border-2"
                    : ""
                } `}
              >
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>{item.icon}</TooltipTrigger>
                    <TooltipContent>{item.label}</TooltipContent>
                  </Tooltip>
                </li>
              </Link>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
};
