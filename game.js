const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 160, y: 160 }];
let snakeDirection = "RIGHT";
let food = { x: 100, y: 100 };
let score = 0;

const moveSnake = () => {
  const head = { ...snake[0] };

  if (snakeDirection === "RIGHT") head.x += gridSize;
  if (snakeDirection === "LEFT") head.x -= gridSize;
  if (snakeDirection === "UP") head.y -= gridSize;
  if (snakeDirection === "DOWN") head.y += gridSize;

  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
};

const generateFood = () => {
  food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
};

const drawGame = () => {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "green" : "black";
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
  
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
};

const gameLoop = () => {
  moveSnake();
  drawGame();

  if (
    snake[0].x < 0 ||
    snake[0].x >= canvasSize ||
    snake[0].y < 0 ||
    snake[0].y >= canvasSize ||
    snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    alert("Game Over! Score: " + score);
    snake = [{ x: 160, y: 160 }];
    snakeDirection = "RIGHT";
    score = 0;
  }
};

const changeDirection = (direction) => {
  if (
    (direction === "LEFT" && snakeDirection !== "RIGHT") ||
    (direction === "RIGHT" && snakeDirection !== "LEFT") ||
    (direction === "UP" && snakeDirection !== "DOWN") ||
    (direction === "DOWN" && snakeDirection !== "UP")
  ) {
    snakeDirection = direction;
  }
};

document.getElementById("leftBtn").addEventListener("click", () => changeDirection("LEFT"));
document.getElementById("rightBtn").addEventListener("click", () => changeDirection("RIGHT"));
document.getElementById("upBtn").addEventListener("click", () => changeDirection("UP"));
document.getElementById("downBtn").addEventListener("click", () => changeDirection("DOWN"));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") changeDirection("LEFT");
  if (e.key === "ArrowRight") changeDirection("RIGHT");
  if (e.key === "ArrowUp") changeDirection("UP");
  if (e.key === "ArrowDown") changeDirection("DOWN");
});

setInterval(gameLoop, 100);
