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
    const oldTodo = editTodo.target.previousElementSibling.innerHTML;
    editLocalTodos(oldTodo, inputText); // Pass both old and new text
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addButton.value = "I Got This!";
    inputBox.value = "";
    editTodo = null;
  }
   else {
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
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodo(inputText);
  }
};

// Function to update todo(Edit/Remove)
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addButton.value = "Edit";
    editTodo = e
  }
};

const saveLocalTodo = (todo) => {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get local todo
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
      todos = [];
  }
  else {
      todos = JSON.parse(localStorage.getItem("todos"));
      todos.forEach(todo => {

          //Creating p tag
          const li = document.createElement("li");
          const p = document.createElement("p");
          p.innerHTML = todo;
          li.appendChild(p);


          // Creating Edit Btn
          const editBtn = document.createElement("button");
          editBtn.innerText = "Edit";
          editBtn.classList.add("btn", "editBtn");
          li.appendChild(editBtn);

          // Creating Delete Btn
          const deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Remove";
          deleteBtn.classList.add("btn", "deleteBtn");
          li.appendChild(deleteBtn);

          todoList.appendChild(li);
      });
  }
}

// Function to delete local todo
const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
      todos = [];
  }
  else {
      todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  // Array functions : slice / splice
  console.log(todoIndex);
}

const editLocalTodos = (oldTodo, newTodo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todoIndex = todos.indexOf(oldTodo);
  if (todoIndex !== -1) {
    todos[todoIndex] = newTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

document.addEventListener("DOMContentLoaded", getLocalTodos)
addButton.addEventListener("click", todoAdd);
todoList.addEventListener("click", updateTodo);
