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

export type User = Prisma.UserFieldRefs;
export type CreateUserParams = Prisma.UserCreateInput;
export type UpdateUserParams = Prisma.UserUpdateInput;
export type CreateOrderParams = Prisma.OrderCreateInput;
export type UpdateOrderParams = Prisma.OrderUpdateInput;

type SizeAndPrice = {
  price: number;
  size: (typeof SIZE)[keyof typeof SIZE];
}[];
export type CreateItemParams = Omit<
  Prisma.ItemCreateInput,
  "id" | "category" | "cart" | "sizes"
> & {
  sizeAndPrice: SizeAndPrice;
  categoryId: string;
};
export type UpdateItemParams = Prisma.ItemUpdateInput;
export type CreateCategoryParams = Prisma.CategoryCreateInput;
export type UpdateCategoryParams = Prisma.CategoryUpdateInput;
export type CreateCustomerParams = Prisma.CustomerCreateInput;
export type UpdateCustomerParams = Prisma.CustomerUpdateInput;

export type Customer = Pick<Prisma.$CustomerPayload, "scalars">;

export type ServerReturnType<T> = Promise<{
  data?: T;
  error?: any;
  status: "success" | "error";
  message: string;
}>;
export const Dietary = {
  VEGAN: "VEGAN",
  VEGETARIAN: "VEGETARIAN",
  GLUTEN_FREE: "GLUTEN_FREE",
  DAIRY_FREE: "DAIRY_FREE",
  NUT_FREE: "NUT_FREE",
} as const;

export const SIZE = {
  REGULAR: "REGULAR",
  LARGE: "LARGE",
  FAMILY: "FAMILY",
  EXTRA_LARGE: "EXTRA_LARGE",
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
} as const;

export type Dietary = (typeof Dietary)[keyof typeof Dietary];
export type Size = (typeof SIZE)[keyof typeof SIZE];
console.log(typeof SIZE);
