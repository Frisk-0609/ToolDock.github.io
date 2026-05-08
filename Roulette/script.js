let items = [];

// 初期読み込み
window.onload = function () {
  updateItems();
};

// テキストエリア → 配列
function updateItems() {
  const input = document.getElementById("itemInput");
  items = input.value.split("\n").filter(v => v.trim() !== "");

  renderItems();
}

// 円形配置
function renderItems() {
  const roulette = document.getElementById("roulette");
  roulette.innerHTML = "";

  if (items.length === 0) return;

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

    roulette.appendChild(div);
  });
}

// ルーレット回転
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
