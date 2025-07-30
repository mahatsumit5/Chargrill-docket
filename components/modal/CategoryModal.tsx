"use client";
import React from "react";
import { Modal } from ".";
import UserForm from "../form/UserForm";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setmodal } from "@/redux/features/modal.slice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { $Enums, Category } from "@prisma/client";

const cate = [
  "CHICKEN",
  "DESSERTS",
  "DRINKS",
  "FINGER_FOOD",
  "SIDES",
  "SALAD",
  "SAUCES",
  "SHARING_BOXES",
] as const;
const CategoryModal = () => {
  const categorySchema = z.enum(cate);
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((store) => store.modal);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setmodal(false))}
      isFullscreen
      showCloseButton
      modalClassName="p-4"
    >
      <div className="bg-card p-3 rounded-md flex flex-col gap-3 w-[400px] ">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Create new category
        </h4>
        <Input value={"sas"} />
        <Button>
          <PlusCircle />
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default CategoryModal;
