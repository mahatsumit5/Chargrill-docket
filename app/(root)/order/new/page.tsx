import { executeQuery } from "@/database";
import {
  getAllCustomers,
  getCustomerById,
} from "@/database/actions/customer.action";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UserForm from "@/components/form/UserForm";

import { SearchUser } from "@/components/search-user/SearchUserComponet";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { error, result } = await getAllCustomers("");
  console.log(result);
  return (
    <div className="bg-accent rounded-md p-4 mt-4">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-semibold">
            Select Customer
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 ">
            {/* search */}
            <div className="flex gap-2"></div>
            <SearchUser customers={result!} />
            <UserForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Select Items</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We offer worldwide shipping through trusted courier partners.
              Standard delivery takes 3-5 business days, while express shipping
              ensures delivery within 1-2 business days.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Payment</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We stand behind our products with a comprehensive 30-day return
              policy. If you&apos;re not completely satisfied, simply return the
              item in its original condition.
            </p>
            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default page;
