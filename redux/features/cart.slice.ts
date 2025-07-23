import { CartItem, CreateCustomerParams, ICustomer } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type form = "UserForm" | "OrderForm";
interface IinitialState {
  items: CartItem[];
}
const initialState: IinitialState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }: PayloadAction<CartItem>) => {
      console.log(payload);
      const itemExistinCart = state.items.find(
        (item) =>
          item.itemId === payload.itemId && item.sizeId === payload.sizeId
      );
      console.log("item already exist");
      // to do replace items in cart with new payload

      if (Boolean(itemExistinCart)) {
        state.items = state.items.map((item) => {
          if (
            item.itemId === payload.itemId &&
            item.sizeId === payload.sizeId
          ) {
            return {
              itemId: payload.itemId,
              orderId: payload.orderId,
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
        state.items = [...state.items, payload];
      }
    },
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { setCart } = actions;
