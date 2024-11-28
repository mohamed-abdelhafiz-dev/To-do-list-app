let addButton = document.querySelector(".add-task-btn");
let tasksDiv = document.querySelector(".tasks");
let promptDiv = document.querySelector(".promptt");
let promptmsg = document.querySelector(".promptt .prompt-msg");
let promptinput = document.querySelector(".promptt .prompt-input");
let saveBtn = document.querySelector(".promptt .save");
let cancelBtn = document.querySelector(".promptt .cancel");
let tasks = [];
if (
  localStorage.getItem("tasks") &&
  JSON.parse(localStorage.getItem("tasks")).length > 0
) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  fillTasksOnThePage();
} else {
  tasksDiv.innerHTML =
    "You Don't have any tasks to do" +
    "&nbsp;" +
    `<i class="fa-solid fa-mug-hot"></i>`;
  tasksDiv.classList.add("no-tasks");
}
addButton.addEventListener("click", function (event) {
  promptDiv.classList.remove("hidden");
  promptDiv.classList.add("prompt");
  promptinput.focus();
  document.querySelector("body").style.background = "#000000d9";
});

saveBtn.addEventListener("click", function (event) {
  let taskTitle = promptinput.value;
  if (taskTitle.trim() == "" && editIndex != null) {
    deleteTask(editIndex);
    editIndex = null;
    promptDiv.classList.remove("prompt");
    promptDiv.classList.add("hidden");
    document.querySelector("body").style.background = "#000";
  }
  if (taskTitle.trim() == "" && editIndex == null) {
    return;
  }

  if (taskTitle !== null && taskTitle.trim().length > 0) {
    if (editIndex != null && taskTitle == tasks[editIndex].title) {
      promptinput.value = "";
      promptDiv.classList.remove("prompt");
      promptDiv.classList.add("hidden");
      document.querySelector("body").style.background = "#0d1a2b";
      editIndex = null;
      return;
    } else if (editIndex != null && taskTitle != tasks[editIndex].title) {
      tasks[editIndex].title = taskTitle;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      fillTasksOnThePage();
      promptDiv.classList.remove("prompt");
      promptDiv.classList.add("hidden");
      document.querySelector("body").style.background = "#0d1a2b";
      editIndex = null;
      promptinput.value = "";
      return;
    }
    let task = createTask(taskTitle);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    fillTasksOnThePage();
  }
  promptDiv.classList.remove("prompt");
  promptDiv.classList.add("hidden");
  promptinput.value = "";
  document.querySelector("body").style.background = "#0d1a2b";
});
cancelBtn.addEventListener("click", function () {
  promptDiv.classList.add("hidden");
  promptDiv.classList.remove("prompt");
  promptinput.value = "";

  document.querySelector("body").style.background = "#0d1a2b";
});
function createTask(taskTitle) {
  let task = {
    title: `${taskTitle}`,
    isDone: false,
    date: `${new Date().getDate()} / ${
      new Date().getMonth() + 1
    } / ${new Date().getFullYear()}&nbsp;&nbsp;&nbsp;&nbsp;${new Date().getHours()}:${new Date().getMinutes()}&nbsp;&nbsp;<i class="fa-regular fa-clock"></i>`,
  };
  return task;
}
function fillTasksOnThePage() {
  tasksDiv.innerHTML =
    "You Don't have any tasks to do" +
    "&nbsp;" +
    `<i class="fa-solid fa-mug-hot"></i>`;
  tasksDiv.classList.add("no-tasks");
  if (tasks.length > 0) {
    tasksDiv.innerHTML = "";
    tasksDiv.classList.remove("no-tasks");
    for (let i = 0; i < tasks.length; i++) {
      tasksDiv.innerHTML += `
            <div aria-label="task" class="task">
                <div  aria-label="task title and date" class="title-date">
                  ${
                    !tasks[i].isDone
                      ? ` <h2 class="task-title">${tasks[i].title}</h2>
                          <span class="task-date">${tasks[i].date}</span>
                        `
                      : ` <h2 class="task-title" style="text-decoration:line-through;opacity:0.3">${tasks[i].title}</h2>
                          <span class="task-date"style="opacity:0.3">${tasks[i].date}</span>`
                  }
                </div>
                    
                <div aria-label="task actions" class="task-actions">
                    
                    ${
                      !tasks[i].isDone
                        ? ` <button role="button" aria-label="complete task" class="isDone-btn" onclick="completeTask(${i})" >
                                <i class="fa-solid fa-circle-check"></i>
                            </button> `
                        : ` <button role="button" aria-label="incomplete task" class="isDone-btn" onclick="completeTask(${i})">
                                <i class="fa-solid fa-circle-minus" style="color:#9E2B25"></i>
                            </button>`
                    }
                    
                    
                    <button role="button" aria-label="edit task" class="edit-btn" onclick="editTask(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button role="button" aria-label="delete task" class="delete-btn" onclick="deleteTask(${i})">
                        <i  class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }
  }
}
function completeTask(index) {
  tasks[index].isDone = !tasks[index].isDone;
  fillTasksOnThePage();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
let editIndex = null;
function editTask(index) {
  promptDiv.classList.remove("hidden");
  promptDiv.classList.add("prompt");
  document.querySelector("body").style.background = "#000000d9";
  editIndex = index;
  promptinput.value = tasks[index].title;
}
function deleteTask(index) {
  tasks.splice(index, 1);
  fillTasksOnThePage();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
