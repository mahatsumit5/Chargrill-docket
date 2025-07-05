import { Button } from "@/components/ui/button";
import { executeQuery } from "@/database";
import { getAllCustomers } from "@/database/actions/customer.action";
import { Customer } from "@/types";
import { List, Plus } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full  ">
      <div className="flex justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Users Management
        </h4>

        <div className="flex gap-4">
          <Button variant={"secondary"} className="gap-2" size={"sm"}>
            <List />
            List View
          </Button>
          <Link
            className="gap-2 flex bg-primary rounded-md text-primary-foreground items-center h-8  px-3 text-xs "
            href={"/users/new"}
          >
            <Plus />
            Create new user
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
