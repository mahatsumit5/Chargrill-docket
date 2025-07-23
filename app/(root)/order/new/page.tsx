import { getAllCustomers } from "@/database/actions/customer.action";
import React from "react";
import { Ubuntu } from "next/font/google";
import OrderForm from "@/components/form/OrderForm";
import { SearchParamProps } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["700"] });

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const email = ((await searchParams)?.email as string) || "";
  const { error, result } = await getAllCustomers(email);
  return (
    <div className=" rounded-md  mt-4 h-full min-h-[70vh] flex flex-col gap-5 justify-start items-start">
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
      <OrderForm customers={result ?? []} />
    </div>
  );
}
