import React from "react";
import { Modal } from ".";
import { useAppSelector } from "@/hooks";
import { LoaderFour, LoaderOne, LoaderThree, LoaderTwo } from "../ui/loader";

const LoadingModal = () => {
  const { loading } = useAppSelector((store) => store.modal);
  return (
    <Modal
      isOpen={loading}
      onClose={() => null}
      showCloseButton={false}
      modalClassName=""
    >
      <LoaderOne />
    </Modal>
  );
};

export default LoadingModal;
