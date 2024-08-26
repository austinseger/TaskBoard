$(document).ready(function () {
    renderTaskList();

    $('#taskDueDate').datepicker({
        dateFormat: 'yy-mm-dd'
    });

    $('#taskForm').on('submit', function (e) {
        e.preventDefault();
        handleAddTask();
    });
});

function handleAddTask() {
    const title = $('#taskTitle').val();
    const description = $('#taskDescription').val();
    const dueDate = $('#taskDueDate').val();

    if (title && description && dueDate) {
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = {
            id: generateTaskId(),
            title: title,
            description: description,
            dueDate: dueDate,
            status: 'to-do' 
        };
        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        renderTaskList();
        clearFormFields();
    } else {
        alert('Please fill out all fields.');
    }
}

function generateTaskId() {
    let nextId = JSON.parse(localStorage.getItem('nextId')) || 1;
    localStorage.setItem('nextId', nextId + 1);
    return nextId;
}

function clearFormFields() {
    $('#taskTitle').val('');
    $('#taskDescription').val('');
    $('#taskDueDate').val('');
}

function renderTaskList() {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    taskList.forEach(task => {
        const taskCard = `
            <div class="card mb-3 task-card" data-task-id="${task.id}">
                <div class="card-header">
                    <h5>${task.title}</h5>
                </div>
                <div class="card-body">
                    <p>${task.description}</p>
                    <p>Due: ${task.dueDate}</p>
                </div>
            </div>
        `;

        if (task.status === 'to-do') {
            $('#todo-cards').append(taskCard);
        } else if (task.status === 'in-progress') {
            $('#in-progress-cards').append(taskCard);
        } else if (task.status === 'done') {
            $('#done-cards').append(taskCard);
        }
    });

    initializeDragAndDrop();
}

function initializeDragAndDrop() {
    $('.task-card').draggable({
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
            $(ui.helper).addClass("dragging-card");
        },
        stop: function (event, ui) {
            $(ui.helper).removeClass("dragging-card");
        }
    });

    $('.lane').droppable({
        accept: '.task-card',
        drop: function (event, ui) {
            const taskId = ui.helper.attr('data-task-id'); 
            const newStatus = $(this).attr('id');  

            updateTaskStatus(taskId, newStatus);
        }
    });
}

function updateTaskStatus(taskId, newStatus) {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList = taskList.map(task => {
        if (task.id === parseInt(taskId)) {
            if (newStatus === 'todo-cards') {
                task.status = 'to-do';
            } else if (newStatus === 'in-progress-cards') {
                task.status = 'in-progress';
            } else if (newStatus === 'done-cards') {
                task.status = 'done';
            }
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();
}
