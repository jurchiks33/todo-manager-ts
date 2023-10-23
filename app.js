document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.getElementById('addTodo');
    var inputField = document.getElementById('todoInput');
    var categorySelect = document.getElementById('categorySelect');
    var todoList = document.getElementById('todoList');
    var filterButtons = document.querySelectorAll('.filter-btn');
    function addTodo() {
        var todoText = inputField.value;
        var category = categorySelect.value;
        if (todoText) {
            var listItem_1 = document.createElement('li');
            listItem_1.dataset.category = category;
            var textNode = document.createTextNode(todoText);
            listItem_1.appendChild(textNode);
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
            });
            editButton_1.addEventListener('click', function () {
                var currentText = listItem_1.firstChild.nodeValue;
                var currentTextNode = listItem_1.firstChild;
                if (editButton_1.textContent === 'Edit') {
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.value = currentText;
                    listItem_1.replaceChild(input, currentTextNode);
                    input.focus();
                    editButton_1.textContent = 'Save';
                }
                else {
                    var input = listItem_1.querySelector('input');
                    var newText = document.createTextNode(input.value);
                    listItem_1.replaceChild(newText, input);
                    editButton_1.textContent = 'Edit';
                }
            });
            listItem_1.addEventListener('dblclick', function () {
                if (listItem_1.classList.contains('completed')) {
                    todoList.removeChild(listItem_1);
                }
            });
            todoList.appendChild(listItem_1);
            inputField.value = '';
        }
        else {
            alert('Please enter a task!');
        }
    }
    function filterTasks(category) {
        var tasks = todoList.getElementsByTagName('li');
        for (var _i = 0, _a = tasks; _i < _a.length; _i++) {
            var task = _a[_i];
            if (task.dataset.category === category || category === 'all') {
                task.style.display = '';
            }
            else {
                task.style.display = 'none';
            }
        }
    }
    addButton.addEventListener('click', addTodo);
    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});
