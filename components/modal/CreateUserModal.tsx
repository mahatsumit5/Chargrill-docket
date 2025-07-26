"use client";
import React from "react";
import { Modal } from ".";
import UserForm from "../form/UserForm";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setmodal } from "@/redux/features/modal.slice";

const CreateUserModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((store) => store.modal);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setmodal(false))}
      isFullscreen
      showCloseButton
      modalClassName="p-4"
    >
      <UserForm />
    </Modal>
  );
};

export default CreateUserModal;
