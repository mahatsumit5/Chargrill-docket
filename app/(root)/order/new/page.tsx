import { getAllCustomers } from "@/database/actions/customer.action";
import React from "react";
import { Ubuntu } from "next/font/google";
import OrderForm from "@/components/form/OrderForm";
import { SearchParamProps } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Save } from "lucide-react";
import { getAllItems } from "@/database/actions/item.action";
import ItemCard from "@/components/item-card/ItemCard";
import UserForm from "@/components/form/UserForm";
import { Button } from "@/components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["700"] });

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const email = ((await searchParams)?.email as string) || "";
  const { error, result } = await getAllCustomers(email);
  const { result: items } = await getAllItems();
  return (
    <div className=" rounded-md  mt-5 h-full min-h-[70vh] flex flex-col gap-5 justify-start items-start ">
      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to find the customer with that email.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold text-sm">Customer Details</p>
        <span className="flex gap-3">
          <Button variant={"outline"}>
            <Save /> Save Draft
          </Button>
          <Button variant={"destructive"}>
            <ResetIcon /> Reset
          </Button>
        </span>
      </div>
      <div className="flex gap-4 w-full flex-col md:flex-row">
        <OrderForm customers={result ?? []} />
        <UserForm />
      </div>

      <p>Select Items</p>

      <div className="flex gap-3 flex-wrap">
        {items?.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
