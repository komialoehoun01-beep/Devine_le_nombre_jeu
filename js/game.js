
// Variables globales du jeu
let secretnumber;
let maxAttempts;
let attemptsLeft;
let currentScore = 0;
let history = [];
let attemptNumber = 0;

const checkBtn = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");
const endZone = document.getElementById("end-zone");
const toggleHistoryBtn = document.getElementById("toggleHistoryBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const introOverlay = document.getElementById('intro-overlay');
const startBtn = document.getElementById('startBtn');

// Restore persisted history panel visibility (true/false as string)
function restoreHistoryVisibility() {
    const panel = document.getElementById('history-panel');
    if (!panel || !toggleHistoryBtn) return;
    const raw = localStorage.getItem('historyVisible');
    const visible = raw === null ? true : raw === 'true';
    panel.style.display = visible ? '' : 'none';
    toggleHistoryBtn.textContent = visible ? 'Masquer' : 'Afficher';
}

// Persist visibility
function setHistoryVisibility(visible) {
    const panel = document.getElementById('history-panel');
    if (!panel || !toggleHistoryBtn) return;
    panel.style.display = visible ? '' : 'none';
    toggleHistoryBtn.textContent = visible ? 'Masquer' : 'Afficher';
    localStorage.setItem('historyVisible', visible ? 'true' : 'false');
}

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
    // Cacher les statistiques et l'historique jusqu'à la fin
    if (endZone) {
        endZone.style.display = 'none';
        // retirer toutes classes de résultat
        endZone.classList.remove('result-win','result-lose','visible');
    }
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
        message.textContent = `🎉 Bravo, vous avez gagné ! Votre score est de: ${currentScore} avec une durée de ${document.getElementById("timer").textContent} secondes`;
        checkBtn.disabled = true;

// Sauvegarde de la partie gagnée
        saveGame({
            date: new Date().toLocaleString(),
            level: document.getElementById("niveau").value,
            score: currentScore,
            time: seconds,
            result: "Gagne",
            attemptsUsed: maxAttempts - attemptsLeft
        });
        updateStats();
        // Afficher les stats et l'historique maintenant
        displayHistory();
        // Afficher animation de victoire
        showResultAnimation('win');
        if (endZone) {
            endZone.style.display = 'block';
            endZone.classList.add('visible');
        }
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
        // Sauvegarde de la partie perdue
saveGame({
    date: new Date().toLocaleString(),
    level: document.getElementById("niveau").value,
    score: currentScore,
    time: seconds,
    result: "Perdu",
    attemptsUsed: maxAttempts
});
        updateStats();
        // Afficher les stats et l'historique maintenant
        displayHistory();
        // Afficher animation de défaite
        showResultAnimation('lose');
        if (endZone) {
            endZone.style.display = 'block';
            endZone.classList.add('visible');
        }
    }
}

// Écoute du clic sur le bouton de validation
checkBtn.addEventListener("click", checkGuess);

// Écoute du clic sur le bouton de redémarrage
restartBtn.addEventListener("click", restartGame);

// Bouton démarrer depuis l'intro
if (startBtn && introOverlay) {
    startBtn.addEventListener('click', () => {
        // masquer l'overlay avec classe
        introOverlay.classList.remove('show');
        // lancer une nouvelle partie
        restartGame();
    });
}

// (skipIntroBtn removed) — intro only starts via `Commencer`

// Basculer l'affichage de l'historique indépendamment
if (toggleHistoryBtn) {
    toggleHistoryBtn.addEventListener('click', () => {
        const panel = document.getElementById('history-panel');
        if (!panel) return;
        const isHidden = panel.style.display === 'none';
        setHistoryVisibility(isHidden);
    });
}

// Supprimer l'historique des tentatives (bouton)
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        if (!confirm('Supprimer l\'historique des tentatives ? Cette action est irréversible.')) return;
        // Prefer using the helper if available
        if (typeof clearGameHistory === 'function') {
            clearGameHistory();
        } else {
            localStorage.removeItem('gameHistory');
        }
        history = [];
        // Persist the empty history so other pages/tabs see the change
        if (typeof displayHistory === 'function') displayHistory();
        attemptNumber = 0;
        const list = document.getElementById('history');
        if (list) list.innerHTML = '';
        document.getElementById('message').textContent = 'Historique supprimé.';
    });
}

// Ajoute une tentative à l'historique
function addToHistory(value, result) {
    attemptNumber++;
    history.push({
        attempt: attemptNumber,
        guess: value,
        result: result
    });
}

// Affiche une animation de résultat : 'win' ou 'lose'
function showResultAnimation(kind) {
    if (!endZone) return;
    // retirer classes précédentes
    endZone.classList.remove('result-win', 'result-lose');
    if (kind === 'win') {
        endZone.classList.add('result-win');
        emitConfetti(28);
    } else if (kind === 'lose') {
        endZone.classList.add('result-lose');
    }
}

// Génère un court effet confetti (éléments DOM supprimés après animation)
function emitConfetti(count) {
    const colors = ['#ffb020','#7ee7c7','#ffd166','#ff7ab6','#7bdff6'];
    let container = document.querySelector('.confetti-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);
    }
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';
        const left = Math.random() * 100; // vw
        el.style.left = left + 'vw';
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.transform = `translateY(-10vh) rotate(${Math.random()*360}deg)`;
        el.style.opacity = (0.7 + Math.random()*0.3).toString();
        el.style.animationDelay = (Math.random() * 200) + 'ms';
        container.appendChild(el);
        // cleanup
        setTimeout(() => { el.remove(); }, 1700 + Math.random()*400);
    }
    // remove container eventually if empty
    setTimeout(() => { if (container.childElementCount === 0) container.remove(); }, 2200);
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
}

// Initial page setup (ne pas démarrer le timer — attendre l'intro)
setupLevel();
loadBestScore();
loadHistory();
resetTimer();
// Afficher l'overlay d'introduction
if (introOverlay) introOverlay.classList.add('show');
// restore UI preferences and stats
restoreHistoryVisibility();
updateStats();