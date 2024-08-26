// Retrieve tasks from localStorage or initialize an empty array
export function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to localStorage
export function saveTasks(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Retrieve nextId from localStorage or initialize it to 1
export function getNextId() {
    return JSON.parse(localStorage.getItem('nextId')) || 1;
}

// Save nextId to localStorage
export function saveNextId(nextId) {
    localStorage.setItem('nextId', JSON.stringify(nextId));
}
