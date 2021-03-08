/* SELECTORS */
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

/* Event Listeners */
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

/* Functions */
function addTodo(event) {
  /* PREVENT FORM FROM SUBMITTING */
  event.preventDefault();
  /* create todo div */
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  /* Create list */
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value; /* WE NEED TO GRAB THE INPUT VALUE */
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // ADD TODO TO LOCAL_STORAGE
  saveLocalTodos(todoInput.value)
  /* CHECK MARK BUTTON */
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  /* CHECK TRASH BUTTON */
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  /* APPEND TO LIST */
  todoList.appendChild(todoDiv);
  /* Clear Todo Input Value */
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  /* DELETE TODO */
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    /* animation */
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  /* CHECK MARK */
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}
/* FILTER FUNCTION */
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Check - Do i HAVE A THING IN THERE?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    /* Create list */
    const newTodo = document.createElement('li');
    newTodo.innerText = todo; /* WE NEED TO GRAB THE INPUT VALUE */
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    /* CHECK MARK BUTTON */
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    /* CHECK TRASH BUTTON */
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    /* APPEND TO LIST */
    todoList.appendChild(todoDiv);


  })
}
/* NEXT STEP --> DELETE THINGS INSIDE THE LOCAL STORAGE */
function removeLocalTodos(todo) {
  // check if theres something in there
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));

}