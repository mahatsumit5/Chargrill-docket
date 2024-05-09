export type CartItem = {
  name: string;
  instructions: string;
  quantity: number;
  size: "LG" | "RG" | null;
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
