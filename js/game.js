
let secretnumber;
let maxAttempts;
let attemptsLeft;

const checkBtn = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");

function generateRandom(max){
    return Math.floor(Math.random() * max) + 1;
}

function setupLevel(){
    const level = document.getElementById("niveau").value;
    let max;

switch(level) {
    case "facile":
        max = 10;
        maxAttempts = 5;
        break;
    case "moyen":
        max = 50;
        maxAttempts = 7;
        break;
    case "difficile":
        max = 100;
        maxAttempts = 10;
        break;
}

    secretnumber = generateRandom(max);
    attemptsLeft = maxAttempts;
    document.getElementById("tries").textContent = attemptsLeft;
    document.getElementById("instruction").textContent = `Devinez un nombre entre 1 et ${max}`;

}

function restartGame(){
    setupLevel();
    document.getElementById("message").textContent = "Choisissez un niveau et commencez à jouer!";
    document.getElementById("guessInput").value = "Entrez votre proposition...";
    checkBtn.disabled = false;
}

function checkGuess(){
    let guess = Number(document.getElementById("guessInput").value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("message").textContent = "Veuillez entrer un nombre valide entre 1 et 100.";
        return;
    }
    attemptsLeft--;
    document.getElementById("tries").textContent = attemptsLeft;

    const message = document.getElementById("message");
    if (guess === secretnumber) {
        message.textContent = "🎉 Bravo, vous avez gagné !";
        checkBtn.disabled = true;
        return;
    }

    if(guess < secretnumber) {
        message.textContent = "📈 plus grand ! Essayez encore.";
    }
    else {
        message.textContent = " 📉plus petit ! Essayez encore.";
    }

    if (attemptsLeft === 0) {
        message.textContent = `💀 Vous avez perdu ! Le nombre secret était ${secretnumber}.`;
        checkBtn.disabled = true;
    }

}

    checkBtn.addEventListener(
    "click",
    checkGuess
);

restartBtn.addEventListener(
    "click",
    restartGame
);

setupLevel();