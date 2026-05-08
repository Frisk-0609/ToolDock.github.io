let items = [];
let colors = [];
let rotation = 0;

const canvas = document.getElementById("roulette");
const ctx = canvas.getContext("2d");

// 初期化
window.onload = function () {
  updateItems();
};

---

# 入力更新

function updateItems() {
  const input = document.getElementById("itemInput");

  items = input.value
    .split("\n")
    .map(v => v.trim())
    .filter(v => v !== "");

  if (items.length === 0) return;

  generateColors();
  draw();
}

---

# 色生成（人数で自動分割）

function generateColors() {
  colors = items.map((_, i) => {
    const hue = (360 / items.length) * i;
    return `hsl(${hue}, 80%, 60%)`;
  });
}

---

# ルーレット描画（円グラフ）

function draw() {
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const centerX = w / 2;
  const centerY = h / 2;
  const radius = w / 2;

  let startAngle = rotation;

  for (let i = 0; i < items.length; i++) {
    const angle = (2 * Math.PI) / items.length;

    // 扇形
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);

    ctx.fillStyle = colors[i];

    ctx.arc(
      centerX,
      centerY,
      radius,
      startAngle,
      startAngle + angle
    );

    ctx.fill();

    startAngle += angle;
  }

  // 中心点（デバッグ用）
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
  ctx.fill();
}

---

# 回転ルーレット（減速付き）

function startRoulette() {
  if (items.length === 0) return;

  let speed = 0.25;

  function spin() {
    rotation += speed;
    speed *= 0.985;

    draw();

    if (speed < 0.001) {
      showResult();
      return;
    }

    requestAnimationFrame(spin);
  }

  spin();
}

---

# 結果表示（簡易ランダム）

function showResult() {
  const index = Math.floor(Math.random() * items.length);

  document.getElementById("result").textContent =
    "🎯 " + items[index];
}
