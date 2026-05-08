let items = [];
let angle = 0;

function addItem() {
  const input = document.getElementById("itemInput");
  const text = input.value;

  if (text === "") return;

  items.push(text);
  input.value = "";

  renderItems();
}

function renderItems() {
  const roulette = document.getElementById("roulette");
  roulette.innerHTML = "";

  const rect = roulette.getBoundingClientRect();
  const radius = rect.width / 2 - 40;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  items.forEach((item, i) => {
    const angle = (i / items.length) * 2 * Math.PI;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const div = document.createElement("div");
    div.className = "item";
    div.textContent = item;

    div.style.left = x + "px";
    div.style.top = y + "px";

    roulette.appendChild(div);
  });
}

function startRoulette() {
  if (items.length === 0) return;

  let speed = 10;
  let rotation = 0;
  let count = 0;

  function spin() {
    rotation += speed;

    document.getElementById("roulette").style.transform =
      `rotate(${rotation}deg)`;

    speed *= 0.97; // 減速

    count++;

    if (count > 200) {
      showResult();
      return;
    }

    requestAnimationFrame(spin);
  }

  spin();
}

function showResult() {
  const index = Math.floor(Math.random() * items.length);
  document.getElementById("result").textContent =
    "🎯 " + items[index];
}
