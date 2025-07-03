import { Prisma } from "@prisma/client";

export type CartItem = {
  id: string;
  name: string;
  instructions?: string;
  quantity: string;
  size?: string;
};

export interface ICustomer {
  fullName: string;
  mobile: string;
  notes?: string;
  time: string;
  date: Date;
}

const cartItems = [
  {
    name: "BBq chicken",
    instructions: "cut in 8s",
    quantity: 10,
    size: null,
  },
  {
    name: "Chicken Skewers",
    instructions: "extra sauce",
    quantity: 1,
    size: null,
  },
  {
    name: "Greek Salad",
    instructions: "make it full",
    quantity: 2,
    size: "Regular",
  },
  {
    name: "Honey Mustard",
    instructions: "no honey",
    quantity: 1,
    size: "Large",
  },
];
export type User = Prisma.UserFieldRefs;
export type CreateUserParams = Prisma.UserCreateInput;
export type UpdateUserParams = Prisma.UserUpdateInput;
export type CreateOrderParams = Prisma.OrderCreateInput;
export type UpdateOrderParams = Prisma.OrderUpdateInput;
export type CreateCartParams = Prisma.CartCreateInput;
export type UpdateCartParams = Prisma.CartUpdateInput;
export type CreateItemParams = Prisma.ItemCreateInput;
export type UpdateItemParams = Prisma.ItemUpdateInput;
export type CreateCategoryParams = Prisma.CategoryCreateInput;
export type UpdateCategoryParams = Prisma.CategoryUpdateInput;
export type CreateCustomerParams = Prisma.CustomerCreateInput;
export type UpdateCustomerParams = Prisma.CustomerUpdateInput;
