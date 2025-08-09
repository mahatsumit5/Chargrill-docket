import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type View = "grid" | "list";
const initial: { view: View } = {
  view: "list",
};
const viewSlice = createSlice({
  name: "view",
  initialState: initial,
  reducers: {
    setview: (state, { payload }: PayloadAction<View>) => {
      state.view = payload;
    },
  },
});
export const { setview } = viewSlice.actions;
export default viewSlice.reducer;
