#  Todo App - Frontend

Ce dépôt contient la partie **frontend** de l'application Todo, développée avec **React**.  
Elle permet de gérer une liste de tâches : création, édition, suppression, et affichage.

---

##  Stack technique

- **React** (avec hooks)
- **Yarn** comme gestionnaire de paquets
- Backend : API REST développée en **NestJS**
- Base de données : **MySQL** via Prisma côté backend

---

##  Installation

1. Clone du repo :

``bash

git clone https://github.com/nassim-elaouad/todo-frontend.git

cd todo-frontend

yarn install

yarn dev

##  Détails des modifications dans `TodoPage.tsx`

Le fichier `TodoPage.tsx` constitue le cœur fonctionnel de la partie frontend. Voici un résumé des actions réalisées :

###  Récupération des tâches
- Utilisation du hook `useEffect()` pour appeler `handleFetchTasks()` au chargement de la page.
- La fonction `handleFetchTasks` effectue une requête `GET` vers `/tasks` et stocke les données dans l’état local `tasks`.

###  Création de tâche
- Ajout d’un champ `TextField` contrôlé (`newTaskName`) permettant à l’utilisateur de saisir une nouvelle tâche.
- Le bouton **"Ajouter"** appelle la fonction `handleSave`, qui :
  - Vérifie que le champ n’est pas vide
  - Envoie une requête `POST` à `/tasks`
  - Rafraîchit la liste des tâches après l’ajout

###  Suppression de tâche
- Chaque tâche a une icône de suppression (`<Delete />`) qui appelle `handleDelete` :
  - Envoie une requête `DELETE` vers `/tasks/:id`
  - Met à jour l’état local `tasks` sans la tâche supprimée

###  Ergonomie & validation
- Empêche l'ajout de tâches vides (`.trim()` sur le champ de saisie).
- Utilisation de composants Material UI :
  - `Table`, `IconButton`, `TextField`, `Typography`, etc.
  - Pour une interface claire, responsive et accessible.


