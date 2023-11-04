const cards = ["A", "A", "B", "B", "C", "C"];
let flippedCards = [];
let matchedCards = [];

function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-index", index);
        cardElement.innerHTML = "?";
        cardElement.onclick = () => flipCard(cardElement);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(cardElement) {
    const index = cardElement.getAttribute("data-index");
    cardElement.innerHTML = cards[index];
    flippedCards.push({ index, cardElement });

    if (flippedCards.length === 2) {
        if (cards[flippedCards[0].index] === cards[flippedCards[1].index]) {
            matchedCards.push(flippedCards[0].index, flippedCards[1].index);
            flippedCards = [];
            if (matchedCards.length === cards.length) {
                alert("Parabéns! Você venceu.");
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach((flippedCard) => {
                    document.querySelector(`[data-index="${flippedCard.index}"]`).innerHTML = "?";
                });
                flippedCards = [];
            }, 1000);
        }
    }
}

createGameBoard();
