const cards = [
  "rei1.png", "rei1.png",
  "rei2.png", "rei2.png",
  "rainha1.png", "rainha1.png",
  "rainha2.png", "rainha2.png",
  "valete1.png", "valete1.png",
  "valete2.png", "valete2.png",
  "joker.png", "joker.png",
  "desenho.png", "desenho.png",
];

let flippedCards = [];
let matchedCards = [];
let playAgain = true;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGameBoard() {
  shuffleArray(cards);
  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-index", index);
    cardElement.setAttribute("data-flipped", "false");
    cardElement.onclick = () => flipCard(cardElement);
    document.body.appendChild(cardElement);
  });
}

function flipCard(cardElement) {
  if (
    flippedCards.length < 2 &&
    cardElement.getAttribute("data-flipped") === "false" &&
    playAgain
  ) {
    const index = cardElement.getAttribute("data-index");
    const imageName = cards[index];
    cardElement.style.backgroundImage = `url('imagens/cartas/${imageName}')`; // Corrigi o caminho da imagem

    cardElement.setAttribute("data-flipped", "true");
    flippedCards.push({ index, cardElement });

    if (flippedCards.length === 2) {
      setTimeout(() => {
        if (cards[flippedCards[0].index] === cards[flippedCards[1].index]) {
          matchedCards.push(flippedCards[0].index, flippedCards[1].index);
          flippedCards = [];
          if (matchedCards.length === cards.length) {
            showCongratulationsMessage();
          }
        } else {
          flippedCards.forEach((flippedCard) => {
            const cardToReset = document.querySelector(
              `[data-index="${flippedCard.index}"]`
            );
            cardToReset.style.backgroundImage = "";
            cardToReset.setAttribute("data-flipped", "false");
          });
          flippedCards = [];
        }
      }, 1000);
    }
  }
}

function showCongratulationsMessage() {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = "Parabéns, você ganhou! Deseja jogar novamente?";
  document.body.appendChild(messageElement);

  const playAgainButton = document.createElement("button");
  playAgainButton.innerHTML = "Sim";
  playAgainButton.onclick = () => {
    playAgain = true;
    resetGame();
    messageElement.remove();
    playAgainButton.remove();
    quitButton.remove();
  };
  document.body.appendChild(playAgainButton);

  const quitButton = document.createElement("button");
  quitButton.innerHTML = "Não";
  quitButton.onclick = () => {
    playAgain = false;
    messageElement.remove();
    playAgainButton.remove();
    quitButton.remove();
  };
  document.body.appendChild(quitButton);
}

function resetGame() {
  matchedCards = [];
  flippedCards = [];
  const cardElements = document.querySelectorAll(".card");
  cardElements.forEach((cardElement) => cardElement.remove());
  createGameBoard();
}

createGameBoard();
