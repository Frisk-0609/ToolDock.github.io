function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value;

  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  document.getElementById("todoList").appendChild(li);

  input.value = "";
}
