import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function useToaster() {
  const [open, toggleOpen] = useState(false);
  const [description, setDescription] = useState("");
  function toast(description?: string) {
    console.log(description);
    toggleOpen(!open);
    setDescription(description ? description : "");
  }
  return { open, toast, description };
}
