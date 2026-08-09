
// Variables globales du jeu
let secretnumber;
let maxAttempts;
let attemptsLeft;
let currentScore = 0;
let history = [];
let attemptNumber = 0;

const checkBtn = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");

// Génère un nombre aléatoire entre 1 et max
function generateRandom(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Configure le niveau de jeu choisi
function setupLevel() {
    const level = document.getElementById("niveau").value;
    let max;

    switch (level) {
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

// Démarre une nouvelle partie
function restartGame() {
    setupLevel();
    document.getElementById("message").textContent = "Choisissez un niveau et commencez à jouer!";
    document.getElementById("guessInput").value = "";
    checkBtn.disabled = false;
    currentScore = 0;
    document.getElementById("score").textContent = currentScore;
    history = [];
    attemptNumber = 0;
    document.getElementById("history").innerHTML = "";
    resetTimer();
    startTimer();
}

// Vérifie la proposition du joueur
function checkGuess() {
    let guess = Number(document.getElementById("guessInput").value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("message").textContent = "Veuillez entrer un nombre valide entre 1 et 100.";
        return;
    }

    attemptsLeft--;
    document.getElementById("tries").textContent = attemptsLeft;

    const message = document.getElementById("message");
    if (guess === secretnumber) {
        stopTimer();
        const level = document.getElementById("niveau").value;
        currentScore = calculateScore(level, attemptsLeft);
        document.getElementById("score").textContent = currentScore;
        updateBestScore(currentScore);
        addToHistory(guess, "Trouvé✅");
        message.textContent = `🎉 Bravo, vous avez gagné ! Votre score est : ${currentScore} avec une durée de ${document.getElementById("timer").textContent} secondes`;
        checkBtn.disabled = true;
        return;
    }

    if (guess < secretnumber) {
        addToHistory(guess, "Trop petit");
        message.textContent = "📈 Plus grand ! Essayez encore.";
    } else {
        addToHistory(guess, "Trop grand");
        message.textContent = "📉 Plus petit ! Essayez encore.";
    }

    if (attemptsLeft === 0) {
        stopTimer();
        addToHistory(guess, "Perdu💀");
        message.textContent = `💀 Vous avez perdu ! Le nombre secret était ${secretnumber}. Temps écoulé : ${document.getElementById("timer").textContent} secondes`;
        checkBtn.disabled = true;
    }
}

// Écoute du clic sur le bouton de validation
checkBtn.addEventListener("click", checkGuess);

// Écoute du clic sur le bouton de redémarrage
restartBtn.addEventListener("click", restartGame);

// Ajoute une tentative à l'historique
function addToHistory(value, result) {
    attemptNumber++;
    history.push({
        attempt: attemptNumber,
        guess: value,
        result: result
    });
    displayHistory();
}

// Affiche l'historique des tentatives
function displayHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    history.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.textContent = `Tentative ${entry.attempt}: Vous avez proposé ${entry.guess} - Résultat: ${entry.result}`;
        historyList.appendChild(listItem);
    });

    localStorage.setItem("gameHistory", JSON.stringify(history));
}

// Charge l'historique depuis le stockage local
function loadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    history = savedHistory;
    attemptNumber = history.length;
    displayHistory();
}

setupLevel();
loadBestScore();
loadHistory();
resetTimer();
startTimer();
