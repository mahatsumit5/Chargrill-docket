import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Concert_One } from "next/font/google";
import Link from "next/link";
const links = [
  { href: "/home", label: "Home" },
  { href: "/home/order", label: "Order" },
  { href: "/home/history", label: "History" },
];
const conConcert_One = Concert_One({
  weight: ["400"],
  subsets: ["latin"],
});
function Header() {
  const router = useRouter();
  return (
    <header className="flex justify-between w-full p-4 border-b ">
      <p className={`${conConcert_One.className} text-3xl text-blue-800`}>
        Docker
      </p>
      <div>
        <ul className="flex gap-24">
          {links.map((item) => (
            <Link key={item.href} href={item.href}>
              <li key={item.href} className="text-xl text-blue-800">
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  );
}

export default Header;
