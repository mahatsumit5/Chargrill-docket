import { CartItem, CreateCustomerParams, ICustomer } from "@/types";
import { Customer, OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export type TCartState = "select_customer" | "order_details" | "select_items";
export type form = "UserForm" | "OrderForm";
interface IinitialState {
  cartItems: CartItem[];
  createdBy: string;
  totalAmount: number;
  status: OrderStatus;
  pickupTime: Date;
  customerId: string;
  paymentStatus: PaymentStatus;
  customer: Customer | undefined;
  cartState: TCartState;
}
const initialState: IinitialState = {
  cartItems: [],
  createdBy: "",
  totalAmount: 0,
  status: "DRAFT",
  pickupTime: new Date(),
  customerId: "",
  paymentStatus: "AWAITING_PAYMENT",
  customer: undefined,
  cartState: "select_customer",
};
type setDetails = Pick<IinitialState, "createdBy">;
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }: PayloadAction<CartItem>) => {
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
      toast("Item added to cart");
    },
    resetCart: (state) => {
      Object.assign(state, initialState);
    },
    setDetails: (
      state,
      {
        payload,
      }: PayloadAction<
        Omit<IinitialState, "cartItems" | "customer" | "customerId">
      >
    ) => {
      Object.assign(state, payload);
    },
    setCustomer: (state, { payload }: PayloadAction<Customer | undefined>) => {
      state.customer = payload;
      state.customerId = payload?.id || "";
    },
    setCartState: (state, { payload }: PayloadAction<TCartState>) => {
      state.cartState = payload;
    },
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { setCart, resetCart, setDetails, setCustomer, setCartState } =
  actions;
