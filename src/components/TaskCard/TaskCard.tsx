import classNames from 'classnames';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import {CircularProgressBar} from '../CircularProgressBar/CircularProgressBar.tsx';
import {priorityLabels, Status, statusLabels, Task} from '../../types/types.ts';
import styles from './style.module.scss';

interface TaskCardProps {
    task: Task;
    onDelete?: (task: Task) => void;
    onEdit?: (task: Task) => void;
    onStatusChange?: (task: string, newStatus: Status) => void;
}

export const TaskCard = ({ task, onDelete, onEdit, onStatusChange }: TaskCardProps) => {
    const { id, title, priority, status, progress } = task;

    const switchStatus = (currentStatus: Status): Status => {
        if (currentStatus === Status.TODO) return Status.PROGRESS;
        if (currentStatus === Status.PROGRESS) return Status.DONE;
        return Status.TODO
    }

    const handleStatusClick = () => {
        const nextStatus = switchStatus(status);
        onStatusChange?.(id, nextStatus)
    }


    return (
        <div className={styles.taskCard}>
            <div className="flex w-100">
                <span className={styles.taskTitle}>Задача</span>
                <span className={styles.task}>{title}</span>
            </div>
            <div className="flex">
                <span className={styles.priorityTitle}>Приоритет</span>
                <span className={classNames(styles[`priority--${priority}`], styles.priority)}>
                    {priorityLabels[priority]}
                </span>
            </div>
            <div className={styles.taskStatusWrapper}>
                <button className={classNames(styles[`status--${status}`], styles.status)} onClick={handleStatusClick}>
                    {statusLabels[status]}
                </button>
            </div>
            <div className={styles.progress}>
                <CircularProgressBar
                    strokeWidth={2}
                    sqSize={24}
                    percentage={progress}
                />
            </div>
            <div className={styles.actions}>
                <EditIcon className="mr-20 cp" onClick={() => onEdit?.(task)} />
                <DeleteIcon className="cp" onClick={() => onDelete?.(task)} />
            </div>
        </div>
    );
};