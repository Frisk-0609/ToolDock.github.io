let todos = [];

// 追加
function addTodo() {
  const input = document.getElementById("todoInput");
  const dateInput = document.getElementById("todoDate");
  const timeInput = document.getElementById("todoTime");

  const text = input.value.trim();
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

  renderTodos();

  input.value = "";
  dateInput.value = "";
  timeInput.value = "";

  saveTodos();
}

// 全体描画
function renderTodos() {
  const list = document.getElementById("todoList");

  // 一旦リセット
  list.innerHTML = "";

  // 何もない時
  if (todos.length === 0) {
    list.innerHTML = `
      <div style="
        border-top: 2px solid #444;
        border-bottom: 2px solid #444;
        padding: 20px;
        margin-top: 10px;
        min-height: 80px;
        text-align: center;
        color: gray;
      ">
        何も予定がありません
      </div>
    `;
    return;
  }

  // Todo表示
  todos.forEach(todo => {
    renderTodo(todo);
  });
}

// 個別描画
function renderTodo(todo) {
  const list = document.getElementById("todoList");

  const li = document.createElement("li");

  li.style.listStyle = "none";
  li.style.border = "2px solid #666";
  li.style.borderRadius = "8px";
  li.style.padding = "15px";
  li.style.margin = "10px 0";
  li.style.background = "#f8f8f8";

  const span = document.createElement("span");

  let displayText = todo.text;

  if (todo.date) {
    const now = new Date();
    const deadline = new Date(todo.date);
    const diff = deadline - now;

    displayText += `（${todo.date.replace("T", " ")}）`;

    // 24時間以内なら赤
    if (diff > 0 && diff < 24 * 60 * 60 * 1000) {
      span.style.color = "red";
      displayText = "！ " + displayText;
    }
  }

  span.textContent = displayText;

  const btn = document.createElement("button");
  btn.textContent = "×";

  btn.style.marginLeft = "15px";

  btn.addEventListener("click", function () {
    todos = todos.filter(t => t.id !== todo.id);

    saveTodos();

    renderTodos();
  });

  li.appendChild(span);
  li.appendChild(btn);

  list.appendChild(li);
}

// 保存
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 読み込み
window.onload = function () {
  const data = localStorage.getItem("todos");

  if (data) {
    todos = JSON.parse(data);
  }

  renderTodos();
};
