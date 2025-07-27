"use client";
import React from "react";
import ErrorFindingCustomer from "../error/ErrorFindingCustomer";
import RenderCards from "../card-display/RenderCards";
import { Ubuntu } from "next/font/google";
import { Customer, Item } from "@prisma/client";
import UserSearch from "../User-search/UserSearch";
import { useAppSelector } from "@/hooks";
import OrderForm from "../form/OrderForm";
import ItemCard from "../item-card/ItemCard";
import { GetAllItemsResponse } from "@/types";
import { TCartState } from "@/redux/features/cart.slice";
import { FastForwardIcon } from "lucide-react";
import { object } from "zod";

type key = "Customer" | "Order" | "Items";
const Stepper: Record<key, TCartState> = {
  Customer: "select_customer",
  Order: "order_details",
  Items: "select_items",
};
Object.keys(Stepper);
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["700"] });
type PropsType = {
  error?: { message: string };
  result: Customer[];
  items: GetAllItemsResponse[];
};
const CreateOrder = (props: PropsType) => {
  const { cartState } = useAppSelector((store) => store.cart);
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <div className=" rounded-full p-3 w-fit bg-card/75 flex justify-between  gap-5">
        {Object.keys(Stepper).map((step, index) => (
          <div key={index} className="flex  gap-2 items-center">
            <div key={index} className="gap-2 flex items-center">
              <p
                className={`rounded-full  p-1 px-3 flex items-center ${
                  Stepper[step as key] === cartState
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                {index + 1}
              </p>
              <p
                className={` ${
                  Stepper[step as key] === cartState
                    ? " text-primary"
                    : "text-accent"
                }`}
              >
                {step}
              </p>
            </div>
            {index + 1 < Object.keys(Stepper).length && (
              <FastForwardIcon
                className={` ${
                  Stepper[step as key] === cartState
                    ? " text-primary"
                    : "text-accent"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {cartState === "select_customer" && <SelectCustomer {...props} />}
      {cartState === "order_details" && <OrderDetails />}
      {cartState === "select_items" && <SelectItems items={props.items} />}
    </div>
  );
};

export default CreateOrder;

const SelectCustomer = ({ error, result }: PropsType) => {
  return (
    <>
      <p className={`${ubuntu.className} text-3xl font-semibold text-primary`}>
        Search your customer
      </p>
      <UserSearch />
      {error ? (
        <ErrorFindingCustomer message={error?.message} />
      ) : (
        <RenderCards data={result!} type="customers" />
      )}
    </>
  );
};
const OrderDetails = () => {
  return (
    <>
      <OrderForm />
    </>
  );
};
const SelectItems = ({ items }: { items: GetAllItemsResponse[] }) => {
  return !items?.length ? (
    <></>
  ) : (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
