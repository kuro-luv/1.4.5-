import "./style.scss"
import { ReactNode } from 'react'

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={handleOverlayClick}>
            <div className="modal-content">{children}</div>
        </div>
    );
};

export default Modal;
