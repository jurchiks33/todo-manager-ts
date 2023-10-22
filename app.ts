document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addTodo') as HTMLButtonElement;
    const inputField = document.getElementById('todoInput') as HTMLInputElement;
    const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
    const todoList = document.getElementById('todoList') as HTMLUListElement;
    const filterButtons = document.querySelectorAll('.filter-btn');

    function addTodo() {
        const todoText = inputField.value;

        if (todoText) {
            const listItem = document.createElement('li');
            const textNode = document.createTextNode(todoText)
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
                const currentText = listItem.firstChild!.nodeValue;
                const currentTextNode = listItem.firstChild;

                if(editButton.textContent === 'Edit') {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = currentText!;
                    listItem.replaceChild(input, currentTextNode!);
                    input.focus();
                    editButton.textContent = 'Save'; 
                } else {
                    const input = listItem.querySelector('input')!;
                    const newText = document.createTextNode(input.value); 
                    listItem.replaceChild(newText, input); 
                    editButton.textContent = 'Edit';
                }
            });

            listItem.addEventListener('dblclick', function () {
                if (listItem.classList.contains('completed')) {
                    todoList.removeChild(listItem);
                }
            });

            todoList.appendChild(listItem);
            inputField.value = '';
        } else {
            alert('Please enter a task!');
        }
    }

    addButton.addEventListener('click', addTodo);

    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});