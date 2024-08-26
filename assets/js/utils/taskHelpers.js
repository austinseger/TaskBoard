import { getTasks, saveTasks } from './storage.js';

export function generateTaskId(nextId) {
    return nextId++;
}

export function setTaskCardColor(taskCard, task) {
    if (!task.dueDate || task.status === 'done') return;

    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    if (now.isSame(taskDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
        taskCard.addClass('bg-danger text-white');
    }
}

export function initializeDroppable() {
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
}
