/* Fichier de sauvegarde du jeu.*/

//fonction pour sauvegarder les données du jeu dans le stockage local
function saveGame(gameData) {

    let games =
        JSON.parse(
            localStorage.getItem("games")
        ) || [];

    games.push(gameData);

    localStorage.setItem(
        "games",
        JSON.stringify(games)
    );
}

//fonction de récupération des données du jeu depuis le stockage local
function loadGames() {
    return JSON.parse(localStorage.getItem("games")) || [];
}

//fonction pour effacer les données du jeu depuis le stockage local
function clearGames() {
    localStorage.removeItem("games");
}

// Supprime uniquement l'historique des tentatives de la dernière partie
function clearGameHistory() {
    // Remplacer par un tableau vide pour garder une forme stable
    localStorage.setItem("gameHistory", JSON.stringify([]));
}

// Met à jour les statistiques affichées (utilise les données sauvegardées)
function updateStats() {
    const games = loadGames();

    const gamesPlayed = games.length;
    const gamesWon = games.filter(g => g.result === "Gagne").length;
    const gamesLost = games.filter(g => g.result === "Perdu").length;

    const avgTime = gamesPlayed === 0 ? 0 : Math.round(games.reduce((s, g) => s + (g.time || 0), 0) / gamesPlayed);

    const elPlayed = document.getElementById("gamesPlayed");
    const elWon = document.getElementById("gamesWon");
    const elLost = document.getElementById("gamesLost");
    const elAvg = document.getElementById("averageTime");

    if (elPlayed) elPlayed.textContent = gamesPlayed;
    if (elWon) elWon.textContent = gamesWon;
    if (elLost) elLost.textContent = gamesLost;
    if (elAvg) elAvg.textContent = avgTime;
}