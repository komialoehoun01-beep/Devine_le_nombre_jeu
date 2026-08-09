let score = 0;

// Calcule le score du joueur selon le niveau et les essais restants
function calculateScore(level, attemptsLeft) {
    let multiplier;
    switch (level) {
        case "facile":
            multiplier = 10;
            break;
        case "moyen":
            multiplier = 20;
            break;
        case "difficile":
            multiplier = 30;
            break;
        default:
            multiplier = 10;
    }

    // Bonus de temps pour trouver rapidement
    const timeBonus = Math.max(0, 60 - seconds);
    score = (attemptsLeft * multiplier) + timeBonus;
    return score;
}

// Met à jour le meilleur score dans le stockage local
function updateBestScore(score) {
    let bestScore = localStorage.getItem("bestScore") || 0;

    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
        bestScore = score;
    }

    document.getElementById("bestScore").textContent = bestScore;
}

// Charge et affiche le meilleur score enregistré
function loadBestScore() {
    let bestScore = localStorage.getItem("bestScore") || 0;
    document.getElementById("bestScore").textContent = bestScore;
}