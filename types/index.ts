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

export type createUserParams = {
  clerkId: string;
  userName?: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
};
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
