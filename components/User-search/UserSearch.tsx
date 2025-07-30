"use client";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import ReuseableFilter from "../ReusableFilterComponent";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/hooks";
import { setLoading } from "@/redux/features/modal.slice";

const UserSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  return (
    <ReuseableFilter name="email" query={email}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setEmail(inputRef.current?.value!);
          dispatch(setLoading(true));
        }}
        className="w-full sm:w-1/2 flex gap-2"
      >
        <Input
          ref={inputRef}
          className=" rounded-full shadow-sm   "
          placeholder="search..."
        />
        <Button
          type="submit"
          variant={"secondary"}
          className="rounded-full bg-secondary shadow-lg "
        >
          <Search />
        </Button>
      </form>
    </ReuseableFilter>
  );
};

export default UserSearch;
