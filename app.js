document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.getElementById('addTodo');
    var inputField = document.getElementById('todoInput');
    var categorySelect = document.getElementById('categorySelect');
    var prioritySelect = document.getElementById('prioritySelect'); // New element
    var dueDate = document.getElementById('dueDate'); // New element
    var todoList = document.getElementById('todoList');
    var filterButtons = document.querySelectorAll('.filter-btn');
    function addTodo() {
        var todoText = inputField.value;
        var category = categorySelect.value;
        var priority = prioritySelect.value; // New variable
        var date = dueDate.value; // New variable
        if (todoText) {
            var listItem_1 = document.createElement('li');
            listItem_1.dataset.category = category;
            listItem_1.dataset.priority = priority; // New dataset attribute
            listItem_1.dataset.date = date; // New dataset attribute
            // We'll display the task text along with its priority and due date
            var textNode = document.createTextNode("".concat(todoText, " - Priority: ").concat(priority, " - Due: ").concat(date));
            listItem_1.appendChild(textNode);
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
            });
            editButton.addEventListener('click', function () {
                // ... existing edit functionality ...
            });
            listItem_1.addEventListener('dblclick', function () {
                // ... existing dblclick functionality ...
            });
            todoList.appendChild(listItem_1);
            inputField.value = '';
            // Resetting the additional input fields after adding a task
            prioritySelect.selectedIndex = 0;
            dueDate.value = '';
        }
        else {
            alert('Please enter a task!');
        }
    }
    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var category = btn.dataset.category;
            filterTasks(category);
        });
    });
    addButton.addEventListener('click', addTodo);
    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});
