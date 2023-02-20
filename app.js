const newTaskText = document.getElementById("input-task");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-button");
let taskListArray = [];

addTaskBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", loadTaskList);
document.addEventListener("DOMContentLoaded", saveTasks);
newTaskText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

function loadTaskList() {
    taskListArray = JSON.parse(localStorage.getItem("tasks"));
    if (taskListArray !== null) {
        taskListArray.forEach((task) => {
            createTask(task.text, task.completed);
        });
    } else {
        taskListArray = [];
    }
}

function addTask() {
    createTask(newTaskText.value, false);
    taskListArray.push(
        {
            text: newTaskText.value,
            completed: false
        }
    );
    newTaskText.value = "";
    saveTasks();
}

function createTask(taskText, completed) {
    const checkbox = document.createElement("input");
    checkbox.className = "completed-check"
    checkbox.type = "checkbox";
    checkbox.name = "completed";
    checkbox.value = "completed";
    checkbox.checked = completed;

    checkbox.addEventListener("click", taskCompleted);
    const text = document.createElement("span");
    text.innerText = taskText;
    text.className = "task";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.name = "delete";
    deleteBtn.value = "delete";
    deleteBtn.addEventListener("click", deleteTask);
    const li = document.createElement("li");
    li.className = "task-item";
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    if (completed) {
        checkbox.parentNode.querySelector(".task").classList.add("completed");
    }
    taskList.appendChild(li);
}

function taskCompleted() {
    const task = this.parentNode.querySelector(".task");
    if (this.checked) {
        task.classList.add("completed");
    } else {
        task.classList.remove("completed");
    }
    setTaskStatus(task.innerText)
}

function setTaskStatus(taskText) {
    const index = taskListArray.findIndex((task) => task.text === taskText);
    taskListArray[index].completed = !taskListArray[index].completed;
    saveTasks()
}

function deleteTask() {
    this.parentNode.remove();
    delete taskListArray[taskListArray.findIndex(
        (task) => task.text === this.parentNode.querySelector(".task").innerText)
        ];
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskListArray));
}