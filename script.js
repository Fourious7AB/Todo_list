document.addEventListener('DOMContentLoaded', ()=>{
    const todoInput=document.getElementById("submit");
const addTaskButton=document.getElementById("todo-list");
const todoList=document.getElementById("todo-input");
const tasks=JSON.parse(localStorage.getItem('tasks'))||[];// Load tasks from localStorage or initialize an empty array

tasks.forEach(task=>renderTasks(task));// Render existing tasks from localStorage
  
addTaskButton.addEventListener("click",()=>{// Add a new task
    const taskText=todoInput.value.trim();
    if(taskText=="")return;// Prevent adding empty tasks


    const newTask={// Create a new task object
        id:Date.now(),
        text:taskText,
        completed:false
    }
    tasks.push(newTask);// Add the new task to the tasks array
    saveTasks();// Save tasks to localStorage
    todoInput.value="";// Clear the input field
    console.log(tasks);



});
function renderTasks(tasks){// Render tasks
        console.log(tasks.text);
        
}


function saveTasks(){// localStorage
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
});