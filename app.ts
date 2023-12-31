document.addEventListener('DOMContentLoaded', function () {
    Notification.requestPermission().then(function (result) {
        console.log('Notification permission status:', result);
    });

    const addButton = document.getElementById('addTodo') as HTMLButtonElement;
    const inputField = document.getElementById('todoInput') as HTMLInputElement;
    const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
    const prioritySelect = document.getElementById('prioritySelect') as HTMLSelectElement; 
    const dueDate = document.getElementById('dueDate') as HTMLInputElement; 
    const todoList = document.getElementById('todoList') as HTMLUListElement;
    const filterButtons = document.querySelectorAll('.filter-btn');

    function updateTaskStatistics() {
        const tasks = todoList.getElementsByTagName('li');
        const totalTasks = tasks.length;
        let completedTasks = 0;
    
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].classList.contains('completed-task')) {
                completedTasks++;
            }
        }
    
        const pendingTasks = totalTasks - completedTasks;
    
        const totalTasksElement = document.getElementById('totalTasks');
        if (totalTasksElement) {
            totalTasksElement.textContent = 'Total Tasks: ' + totalTasks;
        } else {
            console.warn("Element with ID 'totalTasks' not found!");
        }
    
        const completedTasksElement = document.getElementById('completedTasks');
        if (completedTasksElement) {
            completedTasksElement.textContent = 'Completed Tasks: ' + completedTasks;
        } else {
            console.warn("Element with ID 'completedTasks' not found!");
        }
    
        const pendingTasksElement = document.getElementById('pendingTasks');
        if (pendingTasksElement) {
            pendingTasksElement.textContent = 'Pending Tasks: ' + pendingTasks;
        } else {
            console.warn("Element with ID 'pendingTasks' not found!");
        }
    }
    
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

            const textContainer = document.createElement('span'); // Added text container to hold the text
            textContainer.textContent = `${todoText} - Priority: ${priority} - Due: ${date}`;
            listItem.appendChild(textContainer);

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
                updateTaskStatistics();
            });

            editButton.addEventListener('click', function() {
                if (editButton.textContent === 'Edit') {
                    const inputElement = listItem.querySelector('input[type="text"]') as HTMLInputElement;
                    if (inputElement) {
                        const newText = inputElement.value;
                        const newTextElement = document.createTextNode(`${newText} - Priority: ${priority} - Due: ${date}`);
                        listItem.replaceChild(newTextElement, inputElement);
                        editButton.textContent = 'Edit';
                        updateTaskStatistics();
                    } else {
                        console.error('Text input not found');
                    }
                }
            });

            checkBox.addEventListener('change', function() {
                if (checkBox.checked) {
                    listItem.classList.add('completed-task');
                } else {
                    listItem.classList.remove('completed-task');
                }
                updateTaskStatistics();
            });

            todoList.appendChild(listItem);
            inputField.value = '';
            prioritySelect.selectedIndex = 0;
            dueDate.value = '';
            updateTaskStatistics();
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

    const quotes = [
        "The future depends on what you do today. - Mahatma Gandhi",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "Productivity is being able to do things that you were never able to do before. - Franz Kafka",
        "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible. - St. Francis of Assisi",
        "The key is not to prioritize what's on your schedule, but to schedule your priorities. - Stephen Covey"
    ];

    function displayRandomQuote() {
        const quoteDisplay = document.getElementById('quoteDisplay');
        if (quoteDisplay) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            console.log("Selected quote:", quotes[randomIndex]);
            quoteDisplay.textContent = quotes[randomIndex];
        } else {
            console.error("Element with ID 'quoteDisplay' not found!");
        }
    }

    displayRandomQuote();

    updateTaskStatistics();
});