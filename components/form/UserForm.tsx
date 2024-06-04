"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setCustomer, setDisplay } from "@/features/cart.slice";
const formSchema = z.object({
  fullName: z.string({
    required_error: "Full Name is required",
  }),
  mobile: z.string({}),
  date: z.date({
    required_error: "Pickup time slot is required",
  }),
  time: z.string(),
  notes: z.string().optional(),
});

function UserForm() {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((store) => store.cart);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: customer?.notes,
      fullName: customer?.fullName,
      date: new Date(customer?.date || new Date()),
      mobile: customer?.mobile,
      time: customer?.time,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setCustomer(values));
    dispatch(setDisplay("OrderForm"));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FullName</FormLabel>
              <FormControl>
                <Input placeholder="Tracy Champman" {...field} />
              </FormControl>
              <FormDescription>Enter customer Full Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input placeholder="+6145678965" {...field} type="number" />
              </FormControl>
              <FormDescription>Enter customer contact details</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* calender */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Order date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        <>{field.value.toDateString()}</>
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select order date</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* time */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input {...field} type="time" className="" />
              </FormControl>
              <FormDescription>Enter Pickup time slot</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Notes
         */}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
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
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserForm;
