let items = [];

function addItem() {
  const input = document.getElementById("itemInput");
  const text = input.value;

  if (text === "") return;

  items.push(text);

  input.value = "";
  renderItems();
}

function startRoulette() {
  if (items.length === 0) return;

  const result = document.getElementById("result");

  let count = 0;
  let speed = 50; // 最初は速い

  function spin() {
    const randomIndex = Math.floor(Math.random() * items.length);
    result.textContent = items[randomIndex];

    count++;

    // だんだん遅くする
    speed += 15;

    if (count > 25) {
      const finalIndex = Math.floor(Math.random() * items.length);
      result.textContent = "🎯 " + items[finalIndex];
      return;
    }

    setTimeout(spin, speed);
  }

  spin();
}

function renderItems() {
  const ul = document.getElementById("itemList");
  ul.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}
