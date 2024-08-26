import { generateTaskId, getTasks, saveTasks, getNextId, saveNextId } from '../utils/storage.js';
import { renderTaskList } from './TaskList.js';

export function handleAddTask(event) {
    event.preventDefault();

    const title = $('#taskTitle').val();
    const description = $('#taskDescription').val();
    const dueDate = $('#taskDueDate').val();

    if (title && description && dueDate) {
        const taskList = getTasks();
        const nextId = getNextId();
        const newTask = {
            id: generateTaskId(nextId),
            title,
            description,
            dueDate,
            status: 'to-do',
        };
        taskList.push(newTask);
        saveTasks(taskList);
        saveNextId(nextId);
        renderTaskList();
        resetTaskForm();
    } else {
        alert('Please fill out all fields.');
    }
}

function resetTaskForm() {
    $('#taskTitle').val('');
    $('#taskDescription').val('');
    $('#taskDueDate').val('');
}
