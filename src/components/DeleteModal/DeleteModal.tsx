import { Button } from '../Button/Button.tsx';
import { Modal } from '../Modal/Modal.tsx';
import './style.scss';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export const DeleteModal = ({ isOpen, onClose, onDelete }: DeleteModalProps) => {
    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="delete-modal">
                <p>Точно удалить задачу?</p>
                <div className="delete-modal__actions">
                    <Button title="Удалить" onClick={handleDelete} />
                    <Button title="Отмена" outline onClick={onClose} />
                </div>
            </div>
        </Modal>
    );
};