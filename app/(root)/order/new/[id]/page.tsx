"use client";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const CreateNewOrder = () => {
  const form = useForm({
    defaultValues: {},
  });
  const { id } = useParams<{ id: string }>();

  return <div className="">{id}</div>;
};

export default CreateNewOrder;
