document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addTodo') as HTMLButtonElement;
    const inputField = document.getElementById('todoInput') as HTMLInputElement;
    const todoList = document.getElementById('todoList') as HTMLUListElement;

    function addTodo() {
        const todoText = inputField.value;

        if (todoText) {
            const listItem = document.createElement('li');
            listItem.textContent = todoText;

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