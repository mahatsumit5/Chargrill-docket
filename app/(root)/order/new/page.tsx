import { getAllCustomers } from "@/database/actions/customer.action";
import React from "react";
import { Ubuntu } from "next/font/google";
import OrderForm from "@/components/form/OrderForm";
import { SearchParamProps } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Save, User } from "lucide-react";
import { getAllItems } from "@/database/actions/item.action";
import ItemCard from "@/components/item-card/ItemCard";
import UserForm from "@/components/form/UserForm";
import { Button } from "@/components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import UserSearch from "@/components/User-search/UserSearch";
import UserCard from "@/components/user-card/UserCard";
import { Modal } from "@/components/modal";
import ErrorFindingCustomer from "@/components/error/ErrorFindingCustomer";
import RenderCards from "@/components/card-display/RenderCards";
import { Customer } from "@prisma/client";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["700"] });

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const email = ((await searchParams)?.email as string) || "";

  const { error, result } = await getAllCustomers(email, !email);
  // const { result: items } = await getAllItems();
  return (
    <div className=" rounded-md  mt-5 h-full min-h-[70vh] flex flex-col gap-5 justify-start items-start ">
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold text-sm">Customer Details</p>
        <span className="flex gap-3">
          <Button variant={"outline"}>
            <Save /> Save Draft
          </Button>
          <Button variant={"default"}>
            <User /> Add new user
          </Button>
        </span>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <div className="border rounded-md p-3 w-full bg-card">Stepper</div>
        <p
          className={`${ubuntu.className} text-3xl font-semibold text-primary`}
        >
          Search your customer
        </p>
        <UserSearch />

        {error ? (
          <ErrorFindingCustomer message={error?.message} />
        ) : (
          <RenderCards data={result!} type="customers" />
        )}
      </div>
      {/* <div className="flex gap-4 w-full flex-col md:flex-row">
        <OrderForm customers={result ?? []} /> 
         <UserForm />
      </div> */}

      {/* <div className="flex gap-3 flex-wrap">
        {items?.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div> */}
    </div>
  );
}
