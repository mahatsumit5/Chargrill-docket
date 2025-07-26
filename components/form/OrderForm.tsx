"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Customer, OrderStatus, PaymentStatus } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  BadgeDollarSign,
  BookA,
  CalendarDays,
  Check,
  ChevronDownIcon,
  ChevronsUpDown,
  Clock,
  Save,
  Users,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";

import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { setCustomer, setDetails } from "@/redux/features/cart.slice";
import { ResetIcon } from "@radix-ui/react-icons";
const status = [
  "AWAITING_PICKUP",
  "COMPLETED",
  "CONFIRMED",
  "DELIVERED",
  "DISPATCHED",
  "DRAFT",
  "PENDING",
  "READY",
] as const;
const paymentStatus = [
  "AWAITING_PAYMENT",
  "DECLINED",
  "PAYMENT_COMPLETED",
  "REFUNDED",
] as const;

const orderFormSchema = z.object({
  createdBy: z.string(),
  totalAmount: z.number(),
  status: z.enum(status),
  pickupTime: z.date(),
  customerId: z.string({ required_error: "Customer is required" }),
  paymentStatus: z.enum(paymentStatus),
  cartItems: z.array(z.string()),
});

const OrderForm: FC<{ customers: Customer[] }> = ({ customers }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { user } = useUser();
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      createdBy: user?.id,
      status: "DRAFT",
      paymentStatus: "AWAITING_PAYMENT",
      pickupTime: new Date(),
      totalAmount: 0,
      cartItems: [],
      customerId: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof orderFormSchema>) {
    console.log(values);
    dispatch(setDetails(values));
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  w-full flex flex-col gap-4 h-fit"
        onReset={() => form.reset()}
      >
        {/* Customer */}
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem className="p-3 bg-card rounded-md ">
              <FormLabel className="flex items-center gap-2">
                <Users />
                Customer
              </FormLabel>
              <FormControl {...field}>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full  justify-between bg-input hover:bg-input/55  dark:bg-input/30 dark:hover:bg-input hover:text-foreground"
                    >
                      {form.getValues("customerId")
                        ? customers.find(
                            (c) => c.id === form.getValues("customerId")
                          )?.email
                        : "Select Customer..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[350px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search users..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No customer found.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.id}
                              onSelect={() => {
                                form.getValues("customerId") === user.id
                                  ? form.resetField("customerId")
                                  : form.setValue("customerId", user.id);
                                dispatch(setCustomer(user));
                                setOpen(false);
                              }}
                            >
                              {user.email}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  form.getValues("customerId") === user.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {value}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>Select your customer.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row w-full justify-start gap-4 p-3 bg-card rounded-md ">
          {/* Order status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex  gap-2 items-center">
                  <BookA />
                  Status
                </FormLabel>
                <FormControl className="">
                  <Select
                    defaultValue={form.getValues("status")}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full bg-input dark:bg-input/30 ">
                      <SelectValue placeholder="Order Status" />
                    </SelectTrigger>
                    <SelectContent onChange={field.onChange}>
                      <SelectGroup>
                        <SelectLabel>Order Status</SelectLabel>
                        {status.map((stat) => (
                          <SelectItem value={stat} key={stat}>
                            {stat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select order status.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Payment status */}
          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex gap-2 items-center">
                  {" "}
                  <BadgeDollarSign /> Payment Status
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={form.getValues("paymentStatus")}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full bg-input hover:bg-input/75 dark:bg-input/30 dark:hover:bg-input">
                      <SelectValue placeholder="Order Status" />
                    </SelectTrigger>
                    <SelectContent onChange={field.onChange}>
                      <SelectGroup>
                        <SelectLabel>Payment Status</SelectLabel>
                        {paymentStatus.map((stat) => (
                          <SelectItem value={stat} key={stat}>
                            {stat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select order status.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* pickup time */}
        <FormField
          control={form.control}
          name="pickupTime"
          render={({ field }) => (
            <div className="flex gap-4 w-full  justify-between bg-card p-3 rounded-md ">
              <div className="flex flex-col gap-3 w-full">
                <Label
                  htmlFor="date-picker"
                  className="px-1 flex items-center gap-3"
                >
                  <CalendarDays /> Date
                </Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-full justify-between font-normal bg-input hover:bg-input/55 hover:text-foreground"
                    >
                      {form.getValues("pickupTime")
                        ? form.getValues("pickupTime").toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        form.setValue("pickupTime", new Date(date!));
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Label
                  htmlFor="time-picker"
                  className="px-1 flex gap-3 items-center"
                >
                  <Clock /> Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="00:00:00"
                  className=" border appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none bg-input hover:bg-input/55"
                />
              </div>
            </div>
          )}
        />
        <div className="">
          <Button type="submit" className="w-full" variant={"ghost"}>
            <Save /> Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
