import classNames from 'classnames';
import Close from '../../assets/icons/close.svg?react';
import { Button } from '../Button/Button.tsx';
import { Input } from '../Input/Input.tsx';
import { Modal } from '../Modal/Modal.tsx';
import './style.scss';
import { priorityLabels, Priority } from '../../types/types.ts';
import { useState, useEffect } from 'react';

interface AddEditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd?: (task: { title: string; priority: string }) => void;
    onEdit?: (task: { title: string; priority: string }) => void;
    mode?: 'add' | 'edit';
    initialData?: { title: string; priority: string } | null;
}

export const AddEditTaskModal = ({
       isOpen,
       onClose,
       onAdd,
       onEdit,
       mode = 'add',
       initialData
       }: AddEditTaskModalProps) => {
    const [title, setTitle] = useState('');
    const [selectedPriority, setSelectedPriority] = useState<string>('medium');

    // 👈 заполняем форму при редактировании
    useEffect(() => {
        if (initialData && mode === 'edit') {
            setTitle(initialData.title);
            setSelectedPriority(initialData.priority);
        }
    }, [initialData, mode]);

    // 👈 сброс формы при открытии/закрытии
    useEffect(() => {
        if (!isOpen) {
            setTitle('');
            setSelectedPriority('medium');
        } else if (mode === 'add') {
            setTitle('');
            setSelectedPriority('medium');
        }
    }, [isOpen, mode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            if (mode === 'edit' && onEdit) {
                onEdit({ title, priority: selectedPriority });
            } else if (onAdd) {
                onAdd({ title, priority: selectedPriority });
            }
            setTitle('');
            setSelectedPriority('medium');
            onClose();
        }
    };

    const modalTitle = mode === 'edit' ? 'Редактировать задачу' : 'Добавить задачу';
    const buttonText = mode === 'edit' ? 'Редактировать' : 'Добавить';

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="add-edit-modal">
                    <div className="flx-between">
                        <span className="modal-title">{modalTitle}</span>
                        <Close className="cp" onClick={onClose} />
                    </div>
                    <Input
                        label="Задача"
                        placeholder="Введите текст.."
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        value={title}
                    />
                    <div className="modal-priority">
                        <span>Приоритет</span>
                        <ul className="priority-buttons">
                            {['high', 'medium', 'low'].map((priority) => (
                                <li
                                    key={priority}
                                    className={classNames(
                                        priority,
                                        selectedPriority === priority && `${priority}-selected`
                                    )}
                                    onClick={() => setSelectedPriority(priority)}
                                >
                                    {priorityLabels[priority as Priority]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flx-right mt-50">
                        <Button title={buttonText} onClick={handleSubmit} />
                    </div>
                </div>
            </form>
        </Modal>
    );
};