export function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

export function saveTasks(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

export function getNextId() {
    return JSON.parse(localStorage.getItem('nextId')) || 1;
}

export function saveNextId(nextId) {
    localStorage.setItem('nextId', JSON.stringify(nextId));
}
