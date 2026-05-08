let items = [];
let colors = [];

window.onload = function () {
  updateItems();
};

// 入力更新
function updateItems() {
  const input = document.getElementById("itemInput");
  items = input.value.split("\n").filter(v => v.trim() !== "");

  generateColors();
  renderItems();
}

// 色生成（人数で分割）
function generateColors() {
  colors = items.map((_, i) => {
    const hue = (360 / items.length) * i;
    return `hsl(${hue}, 70%, 60%)`;
  });
}

// 円形描画
function renderItems() {
  const roulette = document.getElementById("roulette");
  roulette.innerHTML = "";

  const rect = roulette.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const radius = rect.width / 2 - 40;

  items.forEach((item, i) => {
    const angle = (i / items.length) * 2 * Math.PI;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const div = document.createElement("div");
    div.className = "item";
    div.textContent = item;

    div.style.left = x + "px";
    div.style.top = y + "px";

    // 色分け
    div.style.color = colors[i];

    roulette.appendChild(div);
  });
}

// ルーレット
function startRoulette() {
  if (items.length === 0) return;

  let speed = 20;
  let rotation = 0;
  let count = 0;

  function spin() {
    rotation += speed;

    document.getElementById("roulette").style.transform =
      `rotate(${rotation}deg)`;

    speed *= 0.97;

    count++;

    if (count > 180) {
      const index = Math.floor(Math.random() * items.length);
      document.getElementById("result").textContent =
        "🎯 " + items[index];
      return;
    }

    requestAnimationFrame(spin);
  }

  spin();
}
