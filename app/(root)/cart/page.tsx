"use client";
import { useAppSelector } from "@/hooks";
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
const CartPage = () => {
  const { items } = useAppSelector((store) => store.cart);
  return (
    <Table className=" rounded-md border-none">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className=" border-none">
          <TableHead className="w-fit">Product</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-none">
        {items.map((item) => (
          <TableRow
            key={item.itemId + item.sizeId}
            className="border-none bg-card mt-2"
          >
            <TableCell className="font-medium flex gap-2">
              <Image
                src={item.thumbnail}
                className="rounded-md object-cover"
                width={100}
                height={100}
                alt={item.itemName}
              />
              <span className="flex flex-col gap-2 items-center justify-center">
                <p className="text-sm">{item.itemName}</p>
                <p className="text-sm text-muted">{item.itemName}</p>
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
      </TableFooter>
    </Table>
  );
};

export default CartPage;
