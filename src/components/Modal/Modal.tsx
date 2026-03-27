import styles from "./style.module.scss"
import { ReactNode } from 'react'

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modal} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>{children}</div>
        </div>
    );
};

export default Modal;
