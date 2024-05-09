import { CartItem, ICustomer } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type form = "UserForm" | "OrderForm";
interface IinitialState {
  items: CartItem[];
  display: form;
  customer: ICustomer | null;
}
const initialState: IinitialState = {
  items: [],
  display: "UserForm",
  customer: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }: PayloadAction<CartItem[]>) => {
      state.items = payload;
    },
    setDisplay: (state, { payload }: PayloadAction<form>) => {
      state.display = payload;
    },
    setCustomer: (state, { payload }: PayloadAction<ICustomer>) => {
      state.customer = payload;
    },
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { setCart, setCustomer, setDisplay } = actions;
