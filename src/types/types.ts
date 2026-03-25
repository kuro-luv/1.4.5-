export enum Prioroty {
  LOW = 'low', // Низкий
  MEDIUM = 'medium', // Средний
  HIGH = 'high', // Высокий
}

export enum Status {
  TODO = 'todo', // Сделать
  PROGRESS = 'progress', // В прогрессе
  DONE = 'done', // Сделано
}

//ru names mapa

export const priorityLabels: Record<Prioroty, string> = {
    [Prioroty.LOW]: 'Низкий',
    [Prioroty.MEDIUM]: 'Средний',
    [Prioroty.HIGH]: 'Высокий',
};

export const statusLabels: Record<Status, string> = {
    [Status.TODO]: 'Сделать',
    [Status.PROGRESS]: 'В прогрессе',
    [Status.DONE]: 'Сделано',
};

export type Task = {
    id: string;
    title: string;
    priority: Prioroty;
    status: Status;
    progress: number;
};