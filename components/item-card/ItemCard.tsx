"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { GetAllItemsResponse } from "@/types";
import { ItemSize } from "@prisma/client";
import { SquareArrowOutUpRight } from "lucide-react";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
const orderItemsSchema = z.object({
  sizeId: z.string(),
  itemId: z.string(),
  orderId: z.string(),
  quantity: z.number(),
});
type da = {
  sizeId: string;
  quantity: number;
  price: number;
  totalAmount: number;
};
const ItemCard = ({
  item,
  orderId,
}: {
  item: GetAllItemsResponse;
  orderId: string;
}) => {
  const [data, setData] = useState<da>({
    price: item.sizes[0].price,
    quantity: 1,
    sizeId: item.sizes[0].id,
    totalAmount: 0,
  });
  return (
    <div className="w-full sm:w-[300px] hover:cursor-pointer  flex flex-col gap-4 shadow-accent shadow-lg rounded-xl border border-border ">
      <Image
        width={300}
        height={5}
        src={item.images}
        className=" object-fill rounded-t-md"
        alt={item.name}
        loading="lazy"
        objectFit="cover"
      />
      <div className="p-2 flex flex-col justify-between gap-3">
        {/* name */}
        <div className="flex justify-between items-center ">
          <p className="leading-7 text-md font-semibold ">{item.name}</p>
          <SquareArrowOutUpRight size={16} />
        </div>
        {/* border */}
        <div className="border-b border-border" />
        {/* radio */}
        <div className="flex gap-2 items-center justify-between flex-wrap min-h-12">
          <RadioGroup
            defaultValue={item.sizes[0].id}
            className="flex flex-wrap"
          >
            {item.sizes.map((size: ItemSize) => (
              <div
                key={size.id}
                className="flex items-center justify-start  gap-2"
              >
                <RadioGroupItem
                  value={size.id}
                  id={size.id}
                  onClick={() => {
                    setData({
                      price: size.price,
                      quantity: 1,
                      sizeId: size.id,
                      totalAmount: size.price,
                    });
                  }}
                />
                <Label htmlFor={size.id}>
                  {size.sizeId}-${size.price}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {/* qunantity */}
        <div className="justify-between w-full  items-center flex">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              setData((prev) => ({
                price: prev?.price || 0,
                quantity: prev?.quantity - 1,
                sizeId: prev.sizeId,
                totalAmount: (prev.quantity - 1) * prev.price,
              }));
            }}
          >
            -
          </Button>
          <Button disabled variant={"ghost"} size={"sm"}>
            {data.quantity}
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              setData((prev) => ({
                price: prev?.price || 0,
                quantity: prev?.quantity + 1,
                sizeId: prev.sizeId,
                totalAmount: (prev.quantity + 1) * prev.price,
              }));
            }}
          >
            +
          </Button>
        </div>
        <Button size={"sm"} className="flex justify-between">
          <span>${data?.totalAmount}</span>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
