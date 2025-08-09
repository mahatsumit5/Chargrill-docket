"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { GetAllItemsResponse } from "@/types";
import { ItemSize, SizeEnum } from "@prisma/client";
import { ShoppingBasket, SquareArrowOutUpRight } from "lucide-react";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCart } from "@/redux/features/cart.slice";
const orderItemsSchema = z.object({
  sizeId: z.string(),
  itemId: z.string(),
  quantity: z.number().min(1),
  sizeName: z.string(),
  itemName: z.string(),
  thumbnail: z.string(),
});
type OrderItemType = z.infer<typeof orderItemsSchema>;
type SizeCode = "SM" | "MD" | "RG" | "LG" | "FM" | "RD" | "RCT";
const test: Record<SizeEnum, SizeCode> = {
  SMALL: "SM",
  MEDIUM: "MD",
  LARGE: "LG",
  FAMILY: "FM",
  REGULAR: "RG",
  EXTRA_LARGE: "RD",
};
const ItemCard = ({ item }: { item: GetAllItemsResponse }) => {
  const dispatch = useAppDispatch();
  const defaultSize = item.sizes[0];

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OrderItemType>({
    resolver: zodResolver(orderItemsSchema),
    defaultValues: {
      itemId: item.id,
      sizeId: defaultSize.id,
      quantity: 1,
      sizeName: item.sizes[0].sizeId,
      itemName: item.name,
      thumbnail: item.images,
    },
  });
  const selectedSizeId = watch("sizeId");
  const quantity = watch("quantity");
  const selectedSize = item.sizes.find((size) => size.id === selectedSizeId);
  const price = selectedSize?.price ?? 0;
  const totalAmount = price * quantity;
  const onSubmit = (data: OrderItemType) => {
    console.log(totalAmount);
    dispatch(
      setCart({
        ...data,
        totalAmount,
        price,
        itemName: item.name,
        thumbnail: item.images,
      })
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full  sm:w-[320px] hover:cursor-pointer  shadow-2xl shadow-secondary flex flex-col gap-4  rounded-xl border  bg-card "
    >
      <div className="relative w-full h-[200px]">
        <Image
          fill
          src={item.images}
          className=" object-cover rounded-t-md"
          alt={item.name}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-2 flex flex-col justify-between gap-3">
        {/* name */}
        <div className="flex justify-between items-center ">
          <p className="leading-7 text-md font-semibold ">{item.name}</p>
          <SquareArrowOutUpRight size={16} />
        </div>
        {/* border */}
        <div className="border-b border-border" />
        {/* radio */}
        <div className="flex gap-2 items-center justify-start flex-wrap min-h-12">
          <p>Size</p>
          <RadioGroup
            defaultValue={item.sizes[0].id}
            className="flex flex-wrap"
            onValueChange={(val) => setValue("sizeId", val)}
          >
            {item.sizes.map((size: ItemSize) => (
              <div
                key={size.id}
                className="flex items-center justify-start  gap-2"
              >
                <RadioGroupItem
                  value={size.id}
                  id={size.id}
                  onClick={() => setValue("sizeName", size.sizeId)}
                />
                <Label htmlFor={size.id}>{test[size.sizeId]}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {/* qunantity */}
        <div className="justify-start w-full  items-center flex">
          <p className="text-pretty text-primary mr-4">Quantity</p>
          <Button
            variant={"ghost"}
            size={"sm"}
            type="button"
            className="rounded-none rounded-l-lg"
            onClick={() => {
              const newQty = Math.max(1, quantity - 1);
              setValue("quantity", newQty);
            }}
          >
            -
          </Button>
          <Button variant={"ghost"} size={"sm"} className="rounded-none">
            {quantity}
          </Button>
          <Button
            type="button"
            variant={"ghost"}
            size={"sm"}
            className="rounded-none rounded-r-lg"
            onClick={() => {
              setValue("quantity", quantity + 1);
            }}
          >
            +
          </Button>
        </div>
        <div className="flex justify-between items-end">
          <span>
            <p className="text-xs">Price</p>
            <p className="text-md font-semibold text-primary">${totalAmount}</p>
          </span>
          <Button
            size={"sm"}
            className="flex  hover:cursor-pointer  "
            type="submit"
            variant={"default"}
          >
            <ShoppingBasket /> Add to cart
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ItemCard;
