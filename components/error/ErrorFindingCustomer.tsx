"use client";
import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useAppDispatch } from "@/hooks";
import { setLoading, setmodal } from "@/redux/features/modal.slice";
import CreateUserModal from "../modal/CreateUserModal";

const ErrorFindingCustomer = ({ message }: { message: string }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, [message, dispatch]);
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Error occurred.</AlertTitle>
      <AlertDescription className="">
        <p>{message}</p>
        <button
          className="hover:border-b hover:text-primary hover:cursor-pointer"
          onClick={() => dispatch(setmodal(true))}
        >
          Add a new user
        </button>
        <CreateUserModal />
      </AlertDescription>
    </Alert>
  );
};

export default ErrorFindingCustomer;
