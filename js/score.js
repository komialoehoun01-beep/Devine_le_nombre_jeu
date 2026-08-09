let score = 0; 
//Fonction de calcul du score


function calculateScore(level, attemptsLeft) {

    let multiplier;

    switch(level) {

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

    return attemptsLeft * multiplier;
}

function updateBestScore(score){

    let bestScore =
        localStorage.getItem("bestScore") || 0;

    if(score > bestScore){

        localStorage.setItem(
            "bestScore",
            score
        );

        bestScore = score;
    }

    document.getElementById("bestScore")
        .textContent = bestScore;
}

function loadBestScore(){

    let bestScore =
        localStorage.getItem("bestScore") || 0;

    document.getElementById("bestScore")
        .textContent = bestScore;
}