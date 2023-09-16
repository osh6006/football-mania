import React from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
}
