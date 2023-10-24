document.addEventListener('DOMContentLoaded', function () {
    Notification.requestPermission().then(function (result) {
        console.log('Notification permission status:', result);
    });
    var addButton = document.getElementById('addTodo');
    var inputField = document.getElementById('todoInput');
    var categorySelect = document.getElementById('categorySelect');
    var prioritySelect = document.getElementById('prioritySelect');
    var dueDate = document.getElementById('dueDate');
    var todoList = document.getElementById('todoList');
    var filterButtons = document.querySelectorAll('.filter-btn');
    function updateTaskStatistics() {
        var tasks = todoList.getElementsByTagName('li');
        var totalTasks = tasks.length;
        var completedTasks = 0;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].classList.contains('completed-task')) {
                completedTasks++;
            }
        }
        var pendingTasks = totalTasks - completedTasks;
        // Safely update text content for each element
        var totalTasksElement = document.getElementById('totalTasks');
        if (totalTasksElement) {
            totalTasksElement.textContent = 'Total Tasks: ' + totalTasks;
        }
        else {
            console.warn("Element with ID 'totalTasks' not found!");
        }
        var completedTasksElement = document.getElementById('completedTasks');
        if (completedTasksElement) {
            completedTasksElement.textContent = 'Completed Tasks: ' + completedTasks;
        }
        else {
            console.warn("Element with ID 'completedTasks' not found!");
        }
        var pendingTasksElement = document.getElementById('pendingTasks');
        if (pendingTasksElement) {
            pendingTasksElement.textContent = 'Pending Tasks: ' + pendingTasks;
        }
        else {
            console.warn("Element with ID 'pendingTasks' not found!");
        }
    }
    function addTodo() {
        var todoText = inputField.value;
        var category = categorySelect.value;
        var priority = prioritySelect.value;
        var date = dueDate.value;
        if (todoText) {
            var listItem_1 = document.createElement('li');
            listItem_1.dataset.category = category;
            listItem_1.dataset.priority = priority;
            listItem_1.dataset.date = date;
            var checkBox_1 = document.createElement('input');
            checkBox_1.type = 'checkbox';
            checkBox_1.className = 'complete-checkBox';
            listItem_1.appendChild(checkBox_1);
            var textNode = document.createTextNode("".concat(todoText, " - Priority: ").concat(priority, " - Due: ").concat(date));
            listItem_1.appendChild(textNode);
            checkBox_1.addEventListener('change', function () {
                if (checkBox_1.checked) {
                    listItem_1.classList.add('completed-task');
                }
                else {
                    listItem_1.classList.remove('completed-task');
                }
                updateTaskStatistics();
            });
            var editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';
            listItem_1.appendChild(editButton);
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            listItem_1.appendChild(removeButton);
            removeButton.addEventListener('click', function () {
                todoList.removeChild(listItem_1);
                updateTaskStatistics();
            });
            editButton.addEventListener('click', function () {
            });
            listItem_1.addEventListener('dblclick', function () {
            });
            todoList.appendChild(listItem_1);
            inputField.value = '';
            prioritySelect.selectedIndex = 0;
            dueDate.value = '';
            updateTaskStatistics();
        }
        else {
            alert('Please enter a task!');
        }
    }
    function filterTasks(category) {
        var tasks = todoList.getElementsByTagName('li');
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            if (task.dataset.category === category || category === 'all') {
                task.style.display = '';
            }
            else {
                task.style.display = 'none';
            }
        }
    }
    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var category = btn.dataset.category;
            if (category) {
                filterTasks(category);
            }
            else {
                console.error('Category is undefined');
            }
        });
    });
    addButton.addEventListener('click', addTodo);
    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    updateTaskStatistics();
});
