import classNames from 'classnames';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import { CircularProgressBar } from '../CircularProgressBar/CircularProgressBar.tsx';
import { Task, priorityLabels, statusLabels } from '../../types/types.ts';
import './style.scss';

interface TaskCardProps {
    task: Task;
    onDelete?: (task: Task) => void;
    onEdit?: (task: Task) => void;
}

export const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
    const { title, priority, status, progress } = task;

    return (
        <div className="task-card">
            <div className="flex w-100">
                <span className="task-title">Задача</span>
                <span className="task">{title}</span>
            </div>
            <div className="flex">
                <span className="priority-title">Приоритет</span>
                <span className={classNames(`priority--${priority}`, 'priority')}>
                    {priorityLabels[priority]}
                </span>
            </div>
            <div className="task-status-wrapper">
                <button className={classNames(`status--${status}`, 'status')}>
                    {statusLabels[status]}
                </button>
            </div>
            <div className="progress">
                <CircularProgressBar
                    strokeWidth={2}
                    sqSize={24}
                    percentage={progress}
                />
            </div>
            <div className="actions">
                <EditIcon className="mr-20 cp" onClick={() => onEdit?.(task)} />
                <DeleteIcon className="cp" onClick={() => onDelete?.(task)} />
            </div>
        </div>
    );
};