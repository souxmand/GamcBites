const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = 700; // Largura do canvas
const canvasHeight = 400; // Altura do canvas

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Centralize o canvas na tela com base no tamanho da janela
canvas.style.position = "absolute";
canvas.style.left = "50%";
canvas.style.top = "80%";
canvas.style.transform = "translate(-50%, -50%)";
canvas.style.border = "2px solid black";

document.body.appendChild(canvas);

const paddleWidth = 80;
const paddleHeight = 10;
const ballSize = 10;

let paddleX = (canvasWidth - paddleWidth) / 2;
let ballX = canvasWidth / 2;
let ballY = canvasHeight - paddleHeight - ballSize;
let ballSpeedX = 3;
let ballSpeedY = -3;
let rightPressed = false;
let leftPressed = false;
let gameIsOver = false;

let initialBallSpeedX = 3; // Velocidade inicial da bola em X
let initialBallSpeedY = -3; // Velocidade inicial da bola em Y

let hitCount = 0;
let accelerationTimer = null;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#8701b0";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "#8701b0";
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function updateGameArea() {
  if (rightPressed && paddleX < canvasWidth - paddleWidth) {
    paddleX += 5;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 5;
  }

  if (!gameIsOver) {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (
      ballX + ballSpeedX > canvasWidth - ballSize ||
      ballX + ballSpeedX < ballSize
    ) {
      ballSpeedX = -ballSpeedX;
    }

    if (ballY + ballSpeedY < ballSize) {
      ballSpeedY = -ballSpeedY;
    } else if (ballY + ballSpeedY > canvasHeight - paddleHeight) {
      if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        // Bola atingiu o paddle, inverta a direção Y
        ballSpeedY = -ballSpeedY;

        // Adicione alguma aleatoriedade à direção X
        ballSpeedX = (Math.random() - 0.5) * 8;
      } else {
        // Bola atingiu a parede inferior, jogo acabou
        gameIsOver = true;
        showGameOverMessage();
      }
    }
  }
}

function showGameOverMessage() {
  const gameOverMessage = document.createElement("div");
  gameOverMessage.style.textAlign = "center";
  gameOverMessage.innerHTML =
    "<p>Game Over</p><p>Gostaria de tentar novamente?</p>";

  const tryAgainButtonYes = document.createElement("button");
  tryAgainButtonYes.textContent = "Sim";
  tryAgainButtonYes.addEventListener("click", () => {
    document.body.removeChild(gameOverMessage);
    resetGame();
  });

  const tryAgainButtonNo = document.createElement("button");
  tryAgainButtonNo.textContent = "Não";
  tryAgainButtonNo.addEventListener("click", () => {
    document.body.removeChild(gameOverMessage);
  });

  gameOverMessage.appendChild(tryAgainButtonYes);
  gameOverMessage.appendChild(tryAgainButtonNo);

  document.body.appendChild(gameOverMessage);
}

function resetGame() {
  gameIsOver = false;
  paddleX = (canvasWidth - paddleWidth) / 2;
  ballX = canvasWidth / 2;
  ballY = canvasHeight - paddleHeight - ballSize;
  ballSpeedX = initialBallSpeedX; // Restaura a velocidade inicial da bola em X
  ballSpeedY = initialBallSpeedY; // Restaura a velocidade inicial da bola em Y
  hitCount = 0;
  clearInterval(accelerationTimer); // Limpa o temporizador de aceleração
  accelerationTimer = null;
  draw();
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawPaddle();
  if (!gameIsOver) {
    drawBall();
    updateGameArea();
    requestAnimationFrame(draw);
  }
}

draw();
