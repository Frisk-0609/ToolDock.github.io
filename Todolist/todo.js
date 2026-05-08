function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value;

  if (text === "") return;

  const li = document.createElement("li");

  // テキスト部分
  const span = document.createElement("span");
  span.textContent = text;

  // 削除ボタン
  const btn = document.createElement("button");
  btn.textContent = "×";

  // 削除処理
  btn.addEventListener("click", function () {
    li.remove();
  });

  // liに追加
  li.appendChild(span);
  li.appendChild(btn);

  document.getElementById("todoList").appendChild(li);

  input.value = "";
  saveTodos()
}

function saveTodos() {
  const list = document.querySelectorAll("#todoList li span");
  const todos = [];

  list.forEach(item => {
    todos.push(item.textContent);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

window.onload = function () {
  const data = localStorage.getItem("todos");

  if (!data) return;

  const todos = JSON.parse(data);

  todos.forEach(text => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const btn = document.createElement("button");
    btn.textContent = "×";

    btn.addEventListener("click", function () {
      li.remove();
      saveTodos();
    });

    li.appendChild(span);
    li.appendChild(btn);

    document.getElementById("todoList").appendChild(li);
  });
};
