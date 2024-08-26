import { setTaskCardColor } from '../utils/taskHelpers.js';

export function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card w-75 task-card draggable my-3')
        .attr('data-task-id', task.id);

    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id)
        .on('click', handleDeleteTask);

    setTaskCardColor(taskCard, task);

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}
