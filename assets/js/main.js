import { getTasks, saveTasks, getNextId, saveNextId } from './utils/storage.js';
import { renderTaskList } from './components/TaskList.js';
import { handleAddTask } from './components/TaskForm.js';
import { initializeDroppable } from './utils/taskHelpers.js';

$(document).ready(function () {
    // Initialize date picker and integrate with Day.js for formatting
    dayjs.extend(dayjs_plugin_customParseFormat);

    $('#taskDueDate').datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function(dateText) {
            const formattedDate = dayjs(dateText).format('DD/MM/YYYY');
            $('#taskDueDate').val(formattedDate);
        }
    });

    // Render task list on page load
    renderTaskList();

    // Add task form event listener
    $('#taskForm').on('submit', handleAddTask);

    // Make task lanes droppable
    initializeDroppable();
});
