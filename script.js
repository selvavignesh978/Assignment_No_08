// Selecting Element
const taskHeader = document.querySelector(".Task_Header");
const taskBody = document.querySelector(".Task_Body");

// Deconstruct Element
// 1. Task Header
const searchBar = taskHeader.children[0]; //input

// 2. Task Body
const taskContainer = document.querySelector(".Task_container"); //div.task-container

// Create Element
const list = document.createElement("ul");
const addBtn = document.createElement("button");
const editBtn = document.createElement("button");
addBtn.textContent = "Add Task";
editBtn.textContent = "Update Task";

// Append / Connect element
taskContainer.appendChild(list);
taskHeader.appendChild(addBtn);

// state
let inputState = "";
const taskList = []; //string of array
let isEdit = true; // update action

searchBar.addEventListener("input", (e) => {
    inputState = e.target.value;
});

// Step 1 : To create/add a task to array.
addBtn.addEventListener("click", () => {
  // validate : input state
  if (!inputState) {
    return alert("Please provide task title");
  }

  // store task
  // !problem : duplications
  taskList.push(inputState);

  // display: Pass input state
  displayTask(taskList);

  // clear search
  searchBar.value = "";
  inputState = "";
});

// Step 2 : To Fetch/read/get all task
function displayTask(taskData) {
    // Clear the current list before updating
    list.innerHTML = ""; 

    taskData.map((task, index) => {
        const listItem = document.createElement("li");
      // Flex layout
        listItem.style.display = "flex";
        listItem.style.justifyContent = "space-between"; 
        listItem.style.alignItems = "center";
        listItem.style.padding = "10px";
        listItem.style.border = "1px solid #ccc";
        listItem.style.gap = "5px";
        listItem.style.margin = "5px";


        // spacing between buttons
        editBtn.style.marginRight = "10px";

        listItem.innerHTML = `
            ${task}
            <button onclick="modifyTask(${index})" class="btn btn-warning align-self-end border-radius-15px padding-5px">edit</button>
            <button onclick="removeTask(${index})" class="btn btn-danger align-self-end border-radius-15px padding-5px">delete</button>
        `;
        
        list.appendChild(listItem); // <ul><li>Wake up...
    });
}

// Step 3 : To remove task from array
function removeTask(id) {
  taskList.splice(id, 1);
  displayTask(taskList);
}

// Step 4 : To modify / update / edit task from array
function modifyTask(id) {
  let task = taskList[id];

  // switch button
  taskHeader.removeChild(addBtn);
  taskHeader.appendChild(editBtn);

  // fill input
  searchBar.value = task;

  // wait for click
  editBtn.onclick = () => updateTask(id);
}
// step 5 : To update task from array
function updateTask(id) {
  taskList[id] = searchBar.value;

  displayTask(taskList);

  // switch back button
  taskHeader.removeChild(editBtn);
  taskHeader.appendChild(addBtn);

  searchBar.value = "";
}

// Styling
editBtn.style.backgroundColor = "orange";
editBtn.style.color = "white";
editBtn.style.border = "none";
editBtn.style.padding = "5px 10px";
editBtn.style.borderRadius = "10px";


addBtn.style.backgroundColor = "green";
addBtn.style.color = "white";
addBtn.style.border = "none";
addBtn.style.padding = "5px 10px";
addBtn.style.borderRadius = "10px";

