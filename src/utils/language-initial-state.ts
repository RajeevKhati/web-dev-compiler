export const HTML = `<html lang="en">
<body>
  <div class="container">
    <h1>Todo App</h1>
    <input type="text" id="newTodo" placeholder="Add a new todo" />
    <button onclick="addTodo()">Add</button>
    <ul id="todoList"></ul>
  </div>
</body>
</html>`;

export const CSS = `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .container {
    text-align: center;
  }
  
  input {
    padding: 8px;
    margin-right: 8px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .delete-button {
    margin-left: 8px;
    cursor: pointer;
  }`;

export const JAVASCRIPT = `function addTodo() {
    var newTodoInput = document.getElementById('newTodo');
    var todoList = document.getElementById('todoList');
  
    var newTodoText = newTodoInput.value.trim();
  
    if (newTodoText !== '') {
      var newTodoItem = document.createElement('li');
      newTodoItem.innerHTML = newTodoText + ' <span class="delete-button" onclick="deleteTodo(this)">❌</span>';
      todoList.appendChild(newTodoItem);
      newTodoInput.value = '';
    }
  }
  
  function deleteTodo(element) {
    var todoList = document.getElementById('todoList');
    todoList.removeChild(element.parentNode);
  }`;
