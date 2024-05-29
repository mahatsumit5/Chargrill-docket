"use client";
import { useAppDispatch, useAppSelector } from "@/hook";
import { setCart, setDisplay } from "@/redux/cart.slice";
import React from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { IoCaretBackOutline } from "react-icons/io5";
import { LiaCartPlusSolid } from "react-icons/lia";
import { v4 } from "uuid";
import { Check, ChevronsUpDown } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { CartItem } from "@/types";

const size = [
  { label: "Large", value: "LG" },
  { label: "Regular", value: "RG" },
];

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3).max(50),
  instructions: z.string().max(500).optional(),
  quantity: z.string({ required_error: "Quantity is required" }).min(1),
  size: z.string().optional(),
});

const OrderForm = ({ item }: { item?: CartItem }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      instructions: item?.instructions || "",
      quantity: item?.quantity || "",
      size: item?.size || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setCart({ id: v4(), ...values }));
    form.clearErrors();
    form.reset();
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <Button
          variant={"link"}
          onClick={() => {
            dispatch(setDisplay("UserForm"));
          }}
        >
          <IoCaretBackOutline /> Back
        </Button>
        <Button
          variant={"link"}
          className="relative "
          onClick={() => router.push("/dashboard/cart")}
        >
          {/* {items.length} */}
          <LiaCartPlusSolid size={30} color="" />
          {items.length && (
            <span className="absolute right-2 -top-1 font-bold  rounded-full text-sm  h-5 w-5">
              {items.length}
            </span>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="BBQ chicken" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="10" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Size */}

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select Size</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(" justify-between")}
                      >
                        {field.value
                          ? size.find((item) => item.value === field.value)
                              ?.label
                          : "Select Size"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-4">
                    <div className="flex flex-col gap-4">
                      {size.map((item) => (
                        <button
                          className="bg-slate-200 p-2 rounded-md"
                          key={item.value}
                          value={item.value}
                          onClick={() => {
                            form.setValue("size", item.value);
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <FormDescription>Select the size if applicable</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special instructions"
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex items-end">
            <Button type="submit" variant={"default"} className=" w-full">
              Add item
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
