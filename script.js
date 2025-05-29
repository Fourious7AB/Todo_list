document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const todoForm = document.getElementById("todo-form");
    const todoList = document.getElementById("todo-list");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render all tasks on load
    tasks.forEach(task => renderTask(task));

    // Handle form submission
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        // Clear input field after adding task
        renderTask(newTask);
        todoInput.value = "";
    });

    // Render a single task
    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("id", task.id);
        if(task.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        li.addEventListener('click', (e) => {
            if(e.target.tagName !== 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();// Prevent the click from toggling completion
            tasks = tasks.filter(t => t.id === task.id);// Remove task from array
            li.remove(); // Remove the task from the DOM
            saveTasks();// Save updated tasks to localStorage
        });
       
        todoList.appendChild(li);
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});