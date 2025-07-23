"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CreateNewOrderItems } from "@/database/actions/orderItems.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateNewOrderParams } from "@/types";
import { resetCart } from "@/redux/features/cart.slice";
const CartPage = () => {
  const { cartItems: items } = useAppSelector((store) => store.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();
  async function handleCheckout() {
    const data: CreateNewOrderParams[] = items.map((item) => ({
      itemId: item.itemId,
      orderId: item.orderId,
      quantity: item.quantity,
      sizeId: item.sizeId,
    }));
    const { error, result } = await CreateNewOrderItems(data);
    if (error) {
      console.log(error);
      toast.error("Unable to add items");
    } else {
      console.log(result);
      toast.success("New order created");
      router.push("/");
    }
  }
  return (
    <Table className="  rounded-md bg-card">
      <TableHeader className="border-none">
        <TableRow className=" ">
          <TableHead className="w-fit">Product</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="mt-2">
        {items.map((item) => (
          <TableRow
            key={item.itemId + item.sizeId}
            className=" border-none  mt-2"
          >
            <TableCell className="font-medium flex gap-2">
              <Image
                src={item.thumbnail}
                className="rounded-md object-cover"
                width={150}
                height={150}
                alt={item.itemName}
              />
              <span className="flex flex-col gap-2 items-center justify-center">
                <p className="text-sm">{item.itemName}</p>
                <p className="text-sm text-muted-foreground">{item.itemName}</p>
              </span>
            </TableCell>
            <TableCell className="font-semibold">{item.sizeName}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell className="text-right">${item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
        <Button variant={"ghost"} onClick={handleCheckout}>
          Checkout
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => {
            dispatch(resetCart());
          }}
        >
          Clear
        </Button>
      </TableFooter>
    </Table>
  );
};

export default CartPage;
