import React from "react";
import { ReuseableDialog } from "@/components/dialog/Dialog";
import CatalogueForm from "@/components/form/CatalogueForm";
import CreateNewItemForm from "@/components/form/CreateNewProductForm";
import { executeQuery } from "@/database";
import { getAllCategories } from "@/database/actions/category.action";
import { Category } from "@prisma/client";
import { Check, RotateCcw, Save, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryModal from "@/components/modal/CategoryModal";

const page = async () => {
  const { result } = await getAllCategories();
  return (
    <div className=" p-3 h-full   my-3 flex flex-col gap-4">
      <div className="flex items-center justify-between w-full flex-wrap">
        <span className="flex items-center gap-2 ">
          <Store size={16} />
          <h4 className="scroll-m-20 text-xs md:text-xl font-semibold tracking-tight">
            Add New Item
          </h4>
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant={"secondary"}
            className="flex gap-2 items-center rounded-md "
            size={"sm"}
          >
            <Save size={16} /> Save Draft
          </Button>
          <Button
            className=" flex gap-2 items-center rounded-md"
            type="reset"
            variant={"default"}
            size={"sm"}
          >
            <RotateCcw size={18} /> Reset
          </Button>
        </div>
      </div>
      <div className="flex items-center w-full justify-center">
        <CreateNewItemForm categories={result || []} />
      </div>
      <CategoryModal />
    </div>
  );
};

export default page;
