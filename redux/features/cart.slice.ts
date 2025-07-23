import { CartItem, CreateCustomerParams, ICustomer } from "@/types";
import { OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export type form = "UserForm" | "OrderForm";
interface IinitialState {
  cartItems: CartItem[];
  createdBy: string;
  totalAmount: number;
  status: OrderStatus;
  pickupTime: Date;
  customerId: string;
  paymentStatus: PaymentStatus;
}
const initialState: IinitialState = {
  cartItems: [],
  createdBy: "",
  totalAmount: 0,
  status: "DRAFT",
  pickupTime: new Date(),
  customerId: "",
  paymentStatus: "AWAITING_PAYMENT",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }: PayloadAction<CartItem>) => {
      console.log(payload);
      const itemExistinCart = state.cartItems.find(
        (item) =>
          item.itemId === payload.itemId && item.sizeId === payload.sizeId
      );
      console.log("item already exist");
      // to do replace cartItems in cart with new payload

      if (Boolean(itemExistinCart)) {
        state.cartItems = state.cartItems.map((item) => {
          if (
            item.itemId === payload.itemId &&
            item.sizeId === payload.sizeId
          ) {
            return {
              itemId: payload.itemId,
              quantity: payload.quantity,
              sizeId: payload.sizeId,
              sizeName: payload.sizeName,
              itemName: payload.itemName,
              price: payload.price,
              totalAmount: payload.totalAmount,
              thumbnail: payload.thumbnail,
            };
          } else {
            return item;
          }
        });
      } else {
        state.cartItems = [...state.cartItems, payload];
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
    setDetails: (
      state,
      { payload }: PayloadAction<Omit<IinitialState, "cartItems">>
    ) => {
      Object.assign(state, payload);
    },
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { setCart, resetCart, setDetails } = actions;
