import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import todosService from "../services/todos.js";

const init = async () => {
  loading.start();

  try {
    const todos = await todosService.getAll();
    loadTodos(todos);
  } catch (error) {
    console.error(error);
  } finally {
    loading.stop();
  }

  let highestId = 0;
  todos.forEach((todo) => {
    if (todo.id > highestId) {
      highestId = todo.id;
    }
  });

  const todoForm = document.getElementById("todo-submit");
  todoForm.addEventListener("click", async () => {
    const input = document.getElementById("todo-input");
    const description = input.value.trim();

    if (description) {
      loading.start();
      try {
        await todosService.create(description);
        input.value = "";
        const todos = await todosService.getAll();
        loadTodos(todos);
      } catch (error) {
        console.error(error);
      } finally {
        loading.stop();
      }
    }
  });

  const loadTodos = (todos) => {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      todoItem.innerHTML = `
            <input type="checkbox" data-id="${todo.id}" ${
        todo.completed ? "checked" : ""
      }>
            <span>${todo.description}</span>
            <button class="delete-button" data-id="${todo.id}">Удалить</button>
        `;
      todoList.appendChild(todoItem);
    });
  };

  const todoList = document.getElementById("todo-list");
  todoList.addEventListener("change", async (e) => {
    if (e.target.type === "checkbox") {
      const todoId = e.target.dataset.id;
      const completed = e.target.checked;
      try {
        await todosService.update(todoId, completed);
        const todos = await todosService.getAll();
        loadTodos(todos);
      } catch (error) {
        console.error(error);
      }
    }
  });

  todoList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-button")) {
      const todoId = e.target.dataset.id;

      try {
        await todosService.delete(todoId);
        const todos = await todosService.getAll();
        loadTodos(todos);
      } catch (error) {
        console.error(error);
      }
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
