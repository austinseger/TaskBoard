$(document).ready(function () {
    // Initialize task board
    renderTaskList();

    // Initialize date picker for task due date
    $('#taskDueDate').datepicker({
        dateFormat: 'yy-mm-dd'
    });

    // Add task form submission
    $('#taskForm').on('submit', function (e) {
        e.preventDefault();
        handleAddTask();
    });
});

// Function to handle adding a new task
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
            status: 'to-do' // Default status for a new task
        };
        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        renderTaskList();
        clearFormFields();
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to generate a unique task ID
function generateTaskId() {
    let nextId = JSON.parse(localStorage.getItem('nextId')) || 1;
    localStorage.setItem('nextId', nextId + 1);
    return nextId;
}

// Function to clear the task form after submission
function clearFormFields() {
    $('#taskTitle').val('');
    $('#taskDescription').val('');
    $('#taskDueDate').val('');
}

// Function to render tasks in their respective columns
function renderTaskList() {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    // Clear the task containers
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    // Loop through tasks and place them in the correct column based on status
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

        // Append the task card to the correct column based on its status
        if (task.status === 'to-do') {
            $('#todo-cards').append(taskCard);
        } else if (task.status === 'in-progress') {
            $('#in-progress-cards').append(taskCard);
        } else if (task.status === 'done') {
            $('#done-cards').append(taskCard);
        }
    });

    // Initialize drag-and-drop after rendering tasks
    initializeDragAndDrop();
}

// Function to initialize drag-and-drop functionality
function initializeDragAndDrop() {
    // Make task cards draggable
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

    // Make columns droppable
    $('.lane').droppable({
        accept: '.task-card',
        drop: function (event, ui) {
            const taskId = ui.helper.attr('data-task-id'); // Get the task ID from the dragged card
            const newStatus = $(this).attr('id');  // Get the new column's ID

            // Update task status based on the new column
            updateTaskStatus(taskId, newStatus);
        }
    });
}

// Function to update the task status in localStorage
function updateTaskStatus(taskId, newStatus) {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update the status of the task that was dragged
    taskList = taskList.map(task => {
        if (task.id === parseInt(taskId)) {
            // Map the new column ID to the task status
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

    // Save the updated task list to localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Re-render the task list to reflect changes
    renderTaskList();
}
