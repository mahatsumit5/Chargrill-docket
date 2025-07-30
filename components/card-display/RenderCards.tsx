"use client";
import { Customer, Item } from "@prisma/client";
import React, { useEffect } from "react";
import UserCard from "../user-card/UserCard";
import { useAppDispatch } from "@/hooks";
import { setLoading } from "@/redux/features/modal.slice";

type Displaytype = "customers" | "products";
const RenderCards = ({
  data,
  type,
}: {
  data: Customer[] | Item[];
  type: Displaytype;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
  }, [data, dispatch]);

  switch (type) {
    case "customers":
      return (
        <div className="flex gap-3 flex-wrap items-center justify-center">
          {data?.map((item) => (
            <UserCard customer={item as Customer} key={item.id} />
          ))}
        </div>
      );
  }
};

export default RenderCards;
