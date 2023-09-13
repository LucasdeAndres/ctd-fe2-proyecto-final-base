import React from "react";
import { ContenedorModal, TarjetaModal, CloseButton } from "./styled";
import { CloseButton as Close } from "../../assets";

interface ModalBaseProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBase: React.FC<ModalBaseProps> = ({ onClose, children }) => {
  return (
    <ContenedorModal>
      <TarjetaModal>
        <CloseButton onClick={onClose}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        {children}
      </TarjetaModal>
    </ContenedorModal>
  );
};

export default ModalBase;
