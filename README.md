# Devine_le_nombre_jeu

Jeu de devinette moderne et élégant — trouvez le nombre secret en un minimum d'essais.

Ce dépôt contient une petite application web statique (HTML/CSS/JS) conçue pour être jouée localement dans le navigateur. L'objectif était de proposer une expérience soignée, responsive et professionnelle, avec historique des parties, statistiques et animations.

Principales caractéristiques
- Interface responsive et thème moderne
- Historique des tentatives de la dernière partie
- Statistiques cumulées (parties jouées, gagnées, perdues, temps moyen)
- Animation d'introduction et animations de résultat (victoire/défaite)
- Persistance légère via `localStorage`

Tech stack
- HTML5, CSS3, JavaScript

Installation & exécution
- Ouvrir `index.html` directement dans votre navigateur (double‑clic) pour exécuter localement.
- Option serveur (recommandé pour certains navigateurs) :

	- Avec Python 3:

```bash
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

Structure du projet
- `index.html` — page principale du jeu
- `history.html` — page dédiée affichant l'historique de la dernière partie
- `stats.html` — page dédiée affichant les statistiques cumulées
- `css/style.css` — feuille de styles principale
- `js/` — logique JavaScript (game.js, timer.js, score.js, sauvegarde.js)

Persistance (localStorage)
- `games` — tableau d'objets résumé des parties jouées (date, level, score, time, result, attemptsUsed)
- `gameHistory` — tableau d'objets contenant les tentatives de la dernière partie
- `bestScore` — meilleur score enregistré
- `historyVisible` — préférence d'affichage du panneau historique ("true" / "false")

Utilisation
- Sélectionnez un niveau, cliquez sur "Commencer" et proposez des nombres.
- Le nombre d'essais restants et le timer s'affichent pendant la partie.
- Après une victoire ou une défaite, la zone finale s'affiche avec l'historique et les statistiques.
- Vous pouvez consulter l'historique complet ou les statistiques dans leurs pages dédiées.
- Un bouton permet de supprimer l'historique (confirmez l'action avant suppression).

Contribuer
- Suggestions, issues et pull requests sont bienvenus. Pour des changements importants, ouvrez d'abord une issue pour discuter de la proposition.

Style et accessibilité
- Couleurs et contrastes pensés pour une bonne lisibilité.
- Focus visible pour éléments interactifs (clavier).

Licence
- Ce projet est fourni sans licence explicite — ajoutez un fichier `LICENSE` si vous souhaitez en appliquer une.

Contact
- auteur: komialoehoun01@gmail.com

Merci d'avoir utilisé `Devine_le_nombre_jeu` — amusez‑vous bien !
