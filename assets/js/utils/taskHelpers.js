import { getTasks, saveTasks } from './storage.js';

// Generate unique task IDs
export function generateTaskId(nextId) {
    return nextId++;
}

// Set task card color based on due date
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

// Initialize droppable functionality for task columns
export function initializeDroppable() {
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
}
