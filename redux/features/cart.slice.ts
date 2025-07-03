import { CartItem, CreateCustomerParams, ICustomer } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type form = "UserForm" | "OrderForm";
interface IinitialState {
  items: CartItem[];
  display: form;
  customer: CreateCustomerParams;
}
const initialState: IinitialState = {
  items: [],
  display: "UserForm",
  customer: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postCode: "",
    country: "",
  },
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }: PayloadAction<CartItem>) => {
      state.items = [
        ...state.items.filter((item) => item.id !== payload.id),
        payload,
      ];
    },
    setDisplay: (state, { payload }: PayloadAction<form>) => {
      state.display = payload;
    },
    setCustomer: (state, { payload }: PayloadAction<CreateCustomerParams>) => {
      state.customer = payload;
    },
    removeItem: (state, { payload }: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== payload.id);
    },
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { setCart, setCustomer, setDisplay, removeItem } = actions;
