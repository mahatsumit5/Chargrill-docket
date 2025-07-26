import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitalState {
  isOpen: boolean;
  loading: boolean;
}
const initialState: InitalState = {
  isOpen: false,
  loading: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setmodal: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
  },
});
const { actions, reducer } = modalSlice;

export default reducer;

export const { setmodal, setLoading } = actions;
