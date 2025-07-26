import React from "react";
import { Modal } from ".";
import { useAppSelector } from "@/hooks";

const LoadingModal = () => {
  const { loading } = useAppSelector((store) => store.modal);
  return (
    <Modal
      isOpen={loading}
      onClose={() => null}
      showCloseButton={false}
      modalClassName=""
    >
      <div className="border-white border-y-primary p-5  rounded-full border-2  animate-spin" />
    </Modal>
  );
};

export default LoadingModal;
