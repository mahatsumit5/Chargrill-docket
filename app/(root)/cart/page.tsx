"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateNewOrderParams } from "@/types";
import { CheckCircle2Icon, Edit, ShoppingBag } from "lucide-react";
import { createNewOrder } from "@/database/actions/order.action";
import { setLoading } from "@/redux/features/modal.slice";
import { resetCart } from "@/redux/features/cart.slice";
const CartPage = () => {
  const {
    cartItems,
    pickupTime,
    status,
    paymentStatus,
    totalAmount,
    customer,
    createdBy,
    customerId,
  } = useAppSelector((store) => store.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();
  async function handleCheckout() {
    dispatch(setLoading(true));
    const data: CreateNewOrderParams = {
      status,
      createdBy,
      customerId,
      paymentStatus,
      pickupTime,
      totalAmount,
      cartItems,
    };
    const { error, result } = await createNewOrder(data);
    if (error) {
      dispatch(setLoading(false));
      toast.error("Unable to add items");
    } else {
      router.push("/order");
      dispatch(setLoading(false));

      toast.success("New order created");
      dispatch(resetCart());
    }
  }
  return cartItems.length ? (
    <div className="flex flex-col gap-4 mt-4 md:flex-row w-full  ">
      <div className="flex  rounded-md   gap-2 flex-col w-full md:w-1/3  bg-card p-5  ">
        <h4 className="text-2xl font-semibold text-left">
          Order Confirmation.
        </h4>
        <p className="text-xs text-muted-foreground">
          Please check your customer details before procedding
        </p>

        <p className="font-semibold mt-4 text-lg">Customer Details</p>
        <div className="flex ">
          <p className="text-xs font-semibold w-34 "> Name</p>
          <p className="text-xs  ">
            {customer?.firstName} {customer?.lastName}
          </p>
        </div>
        <div className="flex ">
          <p className="text-xs font-semibold w-34"> Phone</p>
          <p className="text-xs  ">{customer?.phone}</p>
        </div>
        <div className="flex ">
          <p className="text-xs font-semibold w-34"> Email</p>
          <p className="text-xs  ">{customer?.email}</p>
        </div>
        <div className="flex ">
          <p className="text-xs font-semibold w-34 "> Address</p>
          <p className="text-xs font- ">
            {customer?.address}, {customer?.city} {customer?.postCode},{" "}
            {customer?.country}
          </p>
        </div>
        <div className="flex-1 items-end flex w-full gap-2">
          <Button
            className="rounded-full"
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              router.push("/order/new");
            }}
          >
            <Edit /> Edit
          </Button>
          <Button
            className="rounded-full "
            variant={"default"}
            size={"sm"}
            onClick={handleCheckout}
          >
            <CheckCircle2Icon /> Create Order
          </Button>
        </div>
      </div>

      <div className="bg-secondary p-5 rounded-md flex flex-col gap-5 w-full md:w-2/3">
        <p className="font-bold text-lg border-b pb-5 border-border/40 ">
          Order Summary
        </p>
        {/* details */}
        <div className="flex justify-between pb-5 border-dashed border-b-2">
          {/* Status */}
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-semibold">
              Status
            </p>
            <p className="font-semibold text-xs">{status}</p>
          </div>
          {/* date */}
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-semibold">Date</p>
            <p className="font-semibold text-xs">
              {new Date(pickupTime).toLocaleDateString()}
            </p>
          </div>
          {/* Time */}
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-semibold">Time</p>
            <p className="font-semibold text-xs">
              {new Date(pickupTime).toLocaleTimeString()}
            </p>
          </div>

          {/* Payment */}
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-semibold">
              Payment
            </p>
            <p className="font-semibold text-xs">{paymentStatus}</p>
          </div>
        </div>

        {/* Order items */}

        <div className="flex flex-col gap-3 ">
          {cartItems.map((item) => (
            <div key={item.itemId + item.sizeId} className="flex gap-3 ">
              {/* Image */}
              <div className="relative w-[70px]  h-[70px]">
                <Image
                  src={item.thumbnail}
                  className=" object-cover rounded-lg"
                  fill
                  alt={item.itemName}
                />
              </div>

              <div className="flex flex-col w-fit ">
                <p className="font-bold text-sm">{item.itemName}</p>
                <p className="font-semibold text-xs text-muted-foreground mt-1">
                  Size: {item.sizeName}
                </p>
                <p className="font-semibold text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-end flex-1 font-bold">
                ${Number(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex">
          <p className="font-bold">Order Total</p>
          <p className="font-bold flex-1 text-end">${totalAmount}</p>
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
};

const EmptyCart = () => {
  const router = useRouter();
  return (
    <div className="bg-card w-full p-4 rounded-md flex flex-col gap-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Your Cart is Empty.
      </h3>
      <p className="leading-7 ">Add items to your cart and come back again.</p>
      <div>
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            router.push("/order/new");
          }}
        >
          <ShoppingBag />
          Shop
        </Button>
      </div>
    </div>
  );
};
export default CartPage;
