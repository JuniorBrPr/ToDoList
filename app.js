const taskValue = document.getElementById("input-task");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-button");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskLi = createTask();
    taskList.appendChild(taskLi);
    taskValue.value = "";
}

function createTask() {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "completed";
    checkbox.value = "completed";
    const text = document.createElement("span");
    text.innerText = taskValue.value;
    text.className = "task";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x";
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
    return li;
}

function deleteTask() {
    this.parentNode.remove();
}