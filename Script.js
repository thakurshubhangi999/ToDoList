let inputBox = document.getElementById("inputBox");
let addButton = document.getElementById("addButton");
let todoList = document.getElementById("todoList");

let editTodo = null;
// Function to add TODO
const todoAdd = () => {
  const inputText = inputBox.value.trim();
  if (inputText <= 0) {
    alert("Add Atleast One Goal!");
    return false;
  }
  if (addButton.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addButton.value = "I Got This!";
    inputBox.value = "";
    editTodo = null;
  } else {
    // Creating li and p elements
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Creating edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    // Creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "dltBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodo(inputText)
  }
};

// Function to update todo(Edit/Remove)
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addButton.value = "Edit";
    editTodo = e;
  }
};

const saveLocalTodo = (todo) => {

}
addButton.addEventListener("click", todoAdd);
todoList.addEventListener("click", updateTodo);
