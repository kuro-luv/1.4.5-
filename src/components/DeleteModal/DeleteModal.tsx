import { Button } from '../Button/Button.tsx';
import { Modal } from '../Modal/Modal.tsx';
import styles from './style.module.scss';

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
            <div className={styles.deleteModal}>
                <p>Точно удалить задачу?</p>
                <div className={styles['deleteModal__actions']}>
                    <Button title="Удалить" onClick={handleDelete} />
                    <Button title="Отмена" outline onClick={onClose} />
                </div>
            </div>
        </Modal>
    );
};