"use client";
import { useAppDispatch } from "@/hook";
import { setDisplay } from "@/redux/cart.slice";
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
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

const size = [
  { label: "Large", value: "LG" },
  { label: "Regular", value: "RG" },
];

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3).max(50),
  instructions: z.string().max(500).optional(),
  quantity: z.number({ required_error: "Quantity is required" }).min(1),
  size: z.string().optional(),
});

const OrderForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex flex-col">
      <div>
        <Button
          variant={"link"}
          onClick={() => {
            dispatch(setDisplay("UserForm"));
          }}
        >
          Back
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
                        role="combobox"
                        className={cn(" justify-between")}
                      >
                        {/* {field.value
                          ? languages.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Select language"} */}
                        select
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandGroup>
                        {size.map((size) => (
                          <CommandItem
                            key={size.value}
                            onSelect={() => {
                              form.setValue("size", size.value);
                            }}
                          >
                            {size.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Select the size if applicable</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex items-end">
            <Button type="submit" variant={"default"} className=" w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
