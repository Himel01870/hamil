// Snake Game with Helicopter Theme
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = 800;
canvas.height = 600;

const helicopter = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 20,
  dx: 0,
  dy: 0,
};

const items = [];
const score = { value: 0 };
const itemSize = 15;
const itemColors = ["red", "blue", "green", "yellow"];
let gameRunning = true;

// Generate a random item
function spawnItem() {
  const x = Math.random() * (canvas.width - itemSize);
  const y = Math.random() * (canvas.height - itemSize);
  const color = itemColors[Math.floor(Math.random() * itemColors.length)];
  items.push({ x, y, color });
}

// Move helicopter
function updateHelicopter() {
  helicopter.x += helicopter.dx;
  helicopter.y += helicopter.dy;

  // Prevent helicopter from going out of bounds
  helicopter.x = Math.max(0, Math.min(canvas.width - helicopter.size, helicopter.x));
  helicopter.y = Math.max(0, Math.min(canvas.height - helicopter.size, helicopter.y));
}

// Draw the helicopter
function drawHelicopter() {
  ctx.fillStyle = "gray";
  ctx.fillRect(helicopter.x, helicopter.y, helicopter.size, helicopter.size);
  ctx.fillStyle = "black";
  ctx.fillText("🚁", helicopter.x, helicopter.y + helicopter.size);
}

// Draw items
function drawItems() {
  items.forEach((item) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, itemSize, itemSize);
  });
}

// Check collision
function checkCollisions() {
  items.forEach((item, index) => {
    if (
      helicopter.x < item.x + itemSize &&
      helicopter.x + helicopter.size > item.x &&
      helicopter.y < item.y + itemSize &&
      helicopter.y + helicopter.size > item.y
    ) {
      items.splice(index, 1);
      score.value += 10;
      spawnItem();
    }
  });
}

// Draw the score
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score.value}`, 10, 30);
}

// Handle keyboard inputs
function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowUp":
      helicopter.dy = -5;
      break;
    case "ArrowDown":
      helicopter.dy = 5;
      break;
    case "ArrowLeft":
      helicopter.dx = -5;
      break;
    case "ArrowRight":
      helicopter.dx = 5;
      break;
  }
}

function handleKeyUp(e) {
  switch (e.key) {
    case "ArrowUp":
    case "ArrowDown":
      helicopter.dy = 0;
      break;
    case "ArrowLeft":
    case "ArrowRight":
      helicopter.dx = 0;
      break;
  }
}

// Main game loop
function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateHelicopter();
  drawHelicopter();
  drawItems();
  checkCollisions();
  drawScore();

  requestAnimationFrame(gameLoop);
}

// Initialize the game
function init() {
  for (let i = 0; i < 5; i++) {
    spawnItem();
  }
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  gameLoop();
}

init();
