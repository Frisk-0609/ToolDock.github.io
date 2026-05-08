let todos = [];

// 追加
function addTodo() {
  const input = document.getElementById("todoInput");
  const dateInput = document.getElementById("todoDate");
  const timeInput = document.getElementById("todoTime");

  const text = input.value;
  const date = dateInput.value;
  const time = timeInput.value;

  if (text === "") return;

  let dateTime = null;

  // 日付があるときだけ期限設定
  if (date) {
    dateTime = time ? `${date}T${time}` : `${date}T00:00`;
  }

  const todo = {
    id: Date.now(),
    text: text,
    date: dateTime
  };

  todos.push(todo);

  renderTodo(todo);

  input.value = "";
  dateInput.value = "";
  timeInput.value = "";

  saveTodos();
}

// 描画
function renderTodo(todo) {
  const li = document.createElement("li");

  const span = document.createElement("span");

  let displayText = todo.text;

  if (todo.date) {
    const now = new Date();
    const deadline = new Date(todo.date);
    const diff = deadline - now;

    displayText += `（${todo.date.replace("T", " ")}）`;

    if (diff > 0 && diff < 24 * 60 * 60 * 1000) {
      span.style.color = "red";
      displayText = "！ " + displayText;
    }
  }

  span.textContent = displayText;

  const btn = document.createElement("button");
  btn.textContent = "×";

  btn.addEventListener("click", function () {
    li.remove();
    todos = todos.filter(t => t.id !== todo.id);
    saveTodos();
  });

  li.appendChild(span);
  li.appendChild(btn);

  document.getElementById("todoList").appendChild(li);
}

// 保存
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 読み込み
window.onload = function () {
  const data = localStorage.getItem("todos");

  if (!data) return;

  todos = JSON.parse(data);

  todos.forEach(todo => {
    renderTodo(todo);
  });
};
