"use client";
import React, { FC } from "react";
import { Card } from "../ui/card";
import { Customer, User } from "@prisma/client";
import { MapPinCheckInside, Phone, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCartState, setCustomer } from "@/redux/features/cart.slice";

const UserCard: FC<{ customer: Customer; user?: User }> = ({
  user,
  customer,
}) => {
  const dispatch = useAppDispatch();
  const { customer: selectedCustomer } = useAppSelector((store) => store.cart);
  return (
    <Card
      key={customer.id}
      className={`w-full sm:w-[300px] pb-0  ${
        selectedCustomer?.id === customer.id
          ? "border-2 border-primary shadow-primary"
          : ""
      }`}
    >
      <header className="flex flex-col items-center justify-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <small className="text-lg leading-none font-medium">
          {customer.email}
        </small>
      </header>

      <section className=" flex flex-col gap-2 items-center justify-center w-full bg-background-secondary p-2 ">
        <small className="text-sm leading-none font-medium">
          {customer.firstName} {customer.lastName}
        </small>
        <p className="text-muted-foreground text-sm flex items-center ">
          <MapPinCheckInside size={14} /> {customer.address},{customer.state},
          {customer.postCode}
        </p>
        <p className="text-muted-foreground text-sm flex items-center ">
          {customer.city},{customer.country}
        </p>
        <p className="text-muted-foreground text-sm flex items-center ">
          <Phone size={14} />
          {customer.phone}
        </p>
        {customer?.id === selectedCustomer?.id ? (
          <Button
            variant={"ghost"}
            className="w-full hover:bg-destructive  "
            onClick={() => {
              dispatch(setCustomer());
            }}
          >
            <Trash /> Remove
          </Button>
        ) : (
          <Button
            variant={"ghost"}
            className="w-full  "
            onClick={() => {
              dispatch(setCustomer(customer));
              dispatch(setCartState("order_details"));
            }}
          >
            Select
          </Button>
        )}
      </section>
    </Card>
  );
};

export default UserCard;
