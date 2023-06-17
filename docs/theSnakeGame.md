# Snake the game

Because why not

```js
// Define the canvas and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the game variables
const tileSize = 10;
const width = canvas.width / tileSize;
const height = canvas.height / tileSize;
let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = "right";
let score = 0;

// Define the game loop
function gameLoop() {
  // Move the snake
  const head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food.x = Math.floor(Math.random() * width);
    food.y = Math.floor(Math.random() * height);
  } else {
    snake.pop();
  }

  // Check for collision with walls or self
  if (
    head.x < 0 ||
    head.x >= width ||
    head.y < 0 ||
    head.y >= height ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(intervalId);
    alert(`Game over! Score: ${score}`);
  }

  // Clear the canvas and draw the snake and food
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// Start the game loop
const intervalId = setInterval(gameLoop, 100);

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
});
```