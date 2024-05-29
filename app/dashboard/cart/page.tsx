"use client";
import CustomerTable from "@/components/cart/CustomerTable";
import OrderTable from "@/components/cart/OrderTable";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hook";
import React from "react";

export default function Page() {
  const { items } = useAppSelector((s) => s.cart);
  return items.length ? (
    <>
      <p className="text-xl font-bold"> Customer details</p>
      <CustomerTable />
      <p className="text-2xl font-bold">Order details</p>
      <OrderTable />

      <div>
        <Button variant={"outline"}>Finalise</Button>
      </div>
    </>
  ) : (
    <div>Cart is empty</div>
  );
}
