import styles from './style.module.scss';
import Add from '../../assets/icons/add.svg?react';
import { AddEditTaskModal } from '../../components/AddEditTaskModal/AddEditTaskModal.tsx';
import { Button } from '../../components/Button/Button.tsx';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal.tsx';
import { TaskCard } from '../../components/TaskCard/TaskCard.tsx';
import { taskList } from '../../serverData/taskList.ts';
import { Task, Status, Priority } from '../../types/types.ts';
import { useState } from 'react';

export const TodoList = () => {
    const [tasks, setTasks] = useState<Task[]>(taskList);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const openAddModal = () => setShowAddEditModal(true);


    const closeAddEditModal = () => {
        setShowAddEditModal(false);
        setTaskToEdit(null);
    };

    const openEditModal = (task: Task) => {
        setTaskToEdit(task);
        setShowAddEditModal(true);
    };

    const openDeleteModal = (task: Task) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setTaskToDelete(null);
        setShowDeleteModal(false);
    };

    const handleAddTask = (newTask: { title: string; priority: string }) => {
        const newTaskItem: Task = {
            id: String(Date.now()),
            title: newTask.title,
            priority: newTask.priority as Priority,
            status: Status.TODO,
            progress: 0,
        };
        setTasks([newTaskItem, ...tasks]);
    };

    const handleEditTask = (updatedTask: { title: string; priority: string }) => {
        if (taskToEdit) {
            const updatedTasks = tasks.map(task =>
                task.id === taskToEdit.id
                    ? { ...task, title: updatedTask.title, priority: updatedTask.priority as Priority }
                    : task
            );
            setTasks(updatedTasks);
            closeAddEditModal();
        }
    };

    const handleDeleteTask = () => {
        if (taskToDelete) {
            setTasks(tasks.filter(task => task.id !== taskToDelete.id));
            closeDeleteModal();
        }
    };

    const handleStatusChange = (taskId: string, newStatus: Status) => {
        setTasks(tasks.map(task =>
            task.id === taskId
                ? { ...task, status: newStatus }
                : task
        ));
    };

    return (
        <>
            <div className={styles.pageWrapper}>
                <div className={styles.topTitle}>
                    <h2>Список задач</h2>
                    <Button title="Добавить задачу" icon={<Add />} onClick={openAddModal} />
                </div>
                <div className={styles.taskContainer}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={openDeleteModal}
                            onEdit={openEditModal}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            </div>

            {Boolean(showAddEditModal) && (
                <AddEditTaskModal
                    isOpen={showAddEditModal}
                    onClose={closeAddEditModal}
                    onAdd={handleAddTask}
                    onEdit={handleEditTask}
                    mode={taskToEdit ? 'edit' : 'add'}
                    initialData={taskToEdit}
                />
            )}

            {Boolean(showDeleteModal) && (
                <DeleteModal
                    isOpen={showDeleteModal}
                    onClose={closeDeleteModal}
                    onDelete={handleDeleteTask}
                />
            )}
        </>
    );
};