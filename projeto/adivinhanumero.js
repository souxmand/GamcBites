<<<<<<< HEAD
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function guessNumber() {
  const guess = parseInt(document.getElementById("guess").value);
  attempts++;
  if (guess === secretNumber) {
    document.getElementById(
      "message"
    ).innerHTML = `Parabéns! Você acertou em ${attempts} tentativas.`;
  } else if (guess < secretNumber) {
    document.getElementById("message").innerHTML = "Tente um número maior.";
  } else {
    document.getElementById("message").innerHTML = "Tente um número menor.";
  }
}
=======
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function guessNumber() {
    const guess = parseInt(document.getElementById("guess").value);
    attempts++;
    if (guess === secretNumber) {
        document.getElementById("message").innerHTML = `Parabéns! Você acertou em ${attempts} tentativas.`;
    } else if (guess < secretNumber) {
        document.getElementById("message").innerHTML = "Tente um número maior.";
    } else {
        document.getElementById("message").innerHTML = "Tente um número menor.";
    }
}
>>>>>>> 008f1d8432de683731070f1e6a1f7fbfa741e552
