"use client";
import {
  getAllCustomers,
  getCustomerById,
} from "@/database/actions/customer.action";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UserForm from "@/components/form/UserForm";

import { SearchUser } from "@/components/search-user/SearchUserComponet";
import { Input } from "@/components/ui/input";
import { Ubuntu } from "next/font/google";
import { Customer } from "@prisma/client";
import { toast } from "sonner";
import { fa } from "zod/v4/locales";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/user-card/UserCard";
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["700"] });
const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [email, setEmail] = useState<string>("");
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const handleOnSearch = async () => {
    setLoading(true);
    const { error, result } = await getAllCustomers(email);
    console.log(error, result);
    if (!result?.length) {
      toast["error"]("No user found with that email");
    } else {
      console.log(result);
      setData(result!);
    }
    setLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      handleOnSearch();
    }, 2000);

    return () => {
      clearTimeout(1);
    };
  }, [email]);

  return (
    <div className="bg-background-secondary rounded-md p-4 mt-4 h-full min-h-[70vh] flex flex-col gap-10 justify-start items-center">
      <h3
        className={`scroll-m-20 mt-5 text-3xl font-extrabold tracking-tight text-primary ${ubuntu.className}`}
      >
        Search your customer
      </h3>
      <Input
        type="email"
        placeholder="john@xyz.com"
        className="rounded-full bg-primary/60 w-full lg:w-1/2 h-16 text-primary-foreground placeholder:text-primary-foreground/60"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <DisplayUserSection data={data} loading={loading} />
    </div>
  );
};

export default page;

const OrderAccordian = () => {
  return (
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
          <SearchUser customers={[]} />
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
  );
};

const DisplayUserSection = ({
  data,
  loading,
}: {
  loading: boolean;
  data: Customer[];
}) => {
  return loading ? (
    "loading"
  ) : (
    <div className="flex gap-4 w-full  flex-wrap items-center justify-center">
      {data.map((item) => (
        <UserCard customer={item} key={item.id} />
      ))}
    </div>
  );
};
