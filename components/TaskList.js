import { getTasks } from '../utils/storage.js';
import { createTaskCard } from './TaskCard.js';

export function renderTaskList() {
    const taskList = getTasks();

    const todoList = $('#todo-cards').empty();
    const inProgressList = $('#in-progress-cards').empty();
    const doneList = $('#done-cards').empty();

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        if (task.status === 'to-do') {
            todoList.append(taskCard);
        } else if (task.status === 'in-progress') {
            inProgressList.append(taskCard);
        } else if (task.status === 'done') {
            doneList.append(taskCard);
        }
    });

    initializeDraggable();
}

function initializeDraggable() {
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            return original.clone().css({ maxWidth: original.outerWidth() });
        },
    });
}
