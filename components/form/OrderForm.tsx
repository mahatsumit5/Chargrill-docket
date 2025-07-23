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
import { Check, ChevronDownIcon, ChevronsUpDown } from "lucide-react";
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
import { createNewOrder } from "@/database/actions/order.action";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
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
  console.log(pathname);
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
    const { error, result } = await createNewOrder(values);
    if (error) {
      toast["error"]("unexpected");
    } else {
      toast["success"]("Order created now select your items");
      router.push(pathname + "/" + result?.id);
    }
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
        className="bg-card p-3 rounded-lg"
      >
        {/* Order status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Status</FormLabel>
              <FormControl>
                <Select
                  defaultValue={form.getValues("status")}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
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
            <FormItem>
              <FormLabel> Payment Status</FormLabel>
              <FormControl>
                <Select
                  defaultValue={form.getValues("paymentStatus")}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
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
        {/* Customer */}
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormControl {...field}>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[250px] justify-between"
                    >
                      {form.getValues("customerId")
                        ? customers.find(
                            (c) => c.id === form.getValues("customerId")
                          )?.email
                        : "Select Customer..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px] p-0">
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
        {/* pickup time */}
        <FormField
          control={form.control}
          name="pickupTime"
          render={({ field }) => (
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >
                      {form.getValues("pickupTime")
                        ? form.getValues("pickupTime").toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
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
              <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="00:00:00"
                  className=" appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
          )}
        />

        <Button type="submit" className="w-full" variant={"default"}>
          Next
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
