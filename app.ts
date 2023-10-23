document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addTodo') as HTMLButtonElement;
    const inputField = document.getElementById('todoInput') as HTMLInputElement;
    const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
    const prioritySelect = document.getElementById('prioritySelect') as HTMLSelectElement; 
    const dueDate = document.getElementById('dueDate') as HTMLInputElement; 
    const todoList = document.getElementById('todoList') as HTMLUListElement;
    const filterButtons = document.querySelectorAll('.filter-btn');

    function addTodo() {
        const todoText = inputField.value;
        const category = categorySelect.value;
        const priority = prioritySelect.value; 
        const date = dueDate.value; 

        if (todoText) {
            const listItem = document.createElement('li');
            listItem.dataset.category = category;
            listItem.dataset.priority = priority; 
            listItem.dataset.date = date; 

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'complete-checkBox';
            listItem.appendChild(checkBox);

            const textNode = document.createTextNode(`${todoText} - Priority: ${priority} - Due: ${date}`);
            listItem.appendChild(textNode);

            checkBox.addEventListener('change', function() {
                if (checkBox.checked) {
                    listItem.classList.add('completed-task');
                } else {
                    listItem.classList.remove('completed-task');
                }
            });

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
            });

            listItem.addEventListener('dblclick', function () {
            });

            todoList.appendChild(listItem);
            inputField.value = '';
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

    filterButtons.forEach((btn: Element) => {
        btn.addEventListener('click', () => {
            const category = (btn as HTMLElement).dataset.category;
            if (category) { 
                filterTasks(category);
            } else {
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
});