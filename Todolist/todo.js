let deleteMode = false;

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value;

  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  // 削除モード時はクリックで消す
  li.addEventListener("click", function () { 
    if (deleteMode) {
      li.remove();
    }
  });

  document.getElementById("todoList").appendChild(li);

  input.value = "";
}

function toggleDeleteMode() {
  deleteMode = !deleteMode;

  const btn = document.querySelector("button[onclick='toggleDeleteMode()']");

  if (deleteMode) {
    btn.textContent = "削除モード：ON";
  } else {
    btn.textContent = "削除モード：OFF";
  }
}
