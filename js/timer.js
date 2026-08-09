let seconds = 0;
let timerInterval = null;

// Démarre le compteur de temps
function startTimer() {
    stopTimer(); // Arrête un timer déjà lancé

    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer").textContent = formatTime(seconds);
    }, 1000);
}

// Arrête le compteur de temps
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Réinitialise le temps à zéro
function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById("timer").textContent = formatTime(seconds);
}

// Formate le temps en secondes pour l'affichage
function formatTime(value) {
    return value.toString();
}