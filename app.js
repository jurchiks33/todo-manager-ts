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
            var textContainer = document.createElement('span'); // Added text container to hold the text
            textContainer.textContent = "".concat(todoText, " - Priority: ").concat(priority, " - Due: ").concat(date);
            listItem_1.appendChild(textContainer);
            var editButton_1 = document.createElement('button');
            editButton_1.textContent = 'Edit';
            editButton_1.className = 'edit-btn';
            listItem_1.appendChild(editButton_1);
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            listItem_1.appendChild(removeButton);
            removeButton.addEventListener('click', function () {
                todoList.removeChild(listItem_1);
                updateTaskStatistics();
            });
            editButton_1.addEventListener('click', function () {
                if (editButton_1.textContent === 'Edit') {
                    var inputElement = listItem_1.querySelector('input[type="text"]');
                    if (inputElement) {
                        var newText = inputElement.value;
                        var newTextElement = document.createTextNode("".concat(newText, " - Priority: ").concat(priority, " - Due: ").concat(date));
                        listItem_1.replaceChild(newTextElement, inputElement);
                        editButton_1.textContent = 'Edit';
                        updateTaskStatistics();
                    }
                    else {
                        console.error('Text input not found');
                    }
                }
            });
            checkBox_1.addEventListener('change', function () {
                if (checkBox_1.checked) {
                    listItem_1.classList.add('completed-task');
                }
                else {
                    listItem_1.classList.remove('completed-task');
                }
                updateTaskStatistics();
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
    var quotes = [
        "The future depends on what you do today. - Mahatma Gandhi",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "Productivity is being able to do things that you were never able to do before. - Franz Kafka",
        "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible. - St. Francis of Assisi",
        "The key is not to prioritize what's on your schedule, but to schedule your priorities. - Stephen Covey"
    ];
    function displayRandomQuote() {
        var quoteDisplay = document.getElementById('quoteDisplay');
        if (quoteDisplay) {
            var randomIndex = Math.floor(Math.random() * quotes.length);
            console.log("Selected quote:", quotes[randomIndex]);
            quoteDisplay.textContent = quotes[randomIndex];
        }
        else {
            console.error("Element with ID 'quoteDisplay' not found!");
        }
    }
    displayRandomQuote();
    updateTaskStatistics();
});
