document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addTodo') as HTMLButtonElement;
    const inputField = document.getElementById('todoInput') as HTMLInputElement;
    const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
    const prioritySelect = document.getElementById('prioritySelect') as HTMLSelectElement; // New element
    const dueDate = document.getElementById('dueDate') as HTMLInputElement; // New element
    const todoList = document.getElementById('todoList') as HTMLUListElement;
    const filterButtons = document.querySelectorAll('.filter-btn');

    function addTodo() {
        const todoText = inputField.value;
        const category = categorySelect.value;
        const priority = prioritySelect.value; // New variable
        const date = dueDate.value; // New variable

        if (todoText) {
            const listItem = document.createElement('li');
            listItem.dataset.category = category;
            listItem.dataset.priority = priority; // New dataset attribute
            listItem.dataset.date = date; // New dataset attribute

            // We'll display the task text along with its priority and due date
            const textNode = document.createTextNode(`${todoText} - Priority: ${priority} - Due: ${date}`);
            listItem.appendChild(textNode);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';
            listItem.appendChild(editButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            listItem.appendChild(removeButton);

            removeButton.addEventListener('click', function() {
                todoList.removeChild(listItem);
            });

            editButton.addEventListener('click', function() {
                // ... existing edit functionality ...
            });

            listItem.addEventListener('dblclick', function () {
                // ... existing dblclick functionality ...
            });

            todoList.appendChild(listItem);
            inputField.value = '';
            // Resetting the additional input fields after adding a task
            prioritySelect.selectedIndex = 0;
            dueDate.value = '';
        } else {
            alert('Please enter a task!');
        }
    }

    function filterTasks(category: string) {
        const tasks = todoList.getElementsByTagName('li');
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (task.dataset.category === category || category === 'all') {
                task.style.display = '';
            } else {
                task.style.display = 'none'
            }
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
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