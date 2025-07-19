"use client";
import { getAllCustomers } from "@/database/actions/customer.action";
import React, { useEffect, useState } from "react";

import { SearchUser } from "@/components/search-user/SearchUserComponet";
import { Input } from "@/components/ui/input";
import { Ubuntu } from "next/font/google";
import { Customer } from "@prisma/client";
import { toast } from "sonner";

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
