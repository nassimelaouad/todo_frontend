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

git clone https://github.com/nassimelaouad/todo-frontend.git

cd todo-frontend

yarn install

yarn dev

## Fonctionnement du fichier `TodoPage.tsx`

Le composant `TodoPage.tsx` est le cœur de l'application. Il gère toutes les interactions avec l’utilisateur.

### 1\. Récupération des tâches

-   Lors du chargement de la page (`useEffect`), la fonction `handleFetchTasks()` est appelée.
-   Elle effectue un appel `GET` à l’API `/tasks` pour récupérer la liste des tâches.

### 2\. Création de tâche

-   Un champ `TextField` permet à l’utilisateur de saisir une tâche.
-   En cliquant sur "Ajouter", la fonction `handleSave()` :
-   Vérifie que le champ n’est pas vide (`.trim()`)
-   Envoie une requête `POST` vers `/tasks`
-   Rafraîchit la liste après l’ajout

### 3\. Suppression de tâche

-   Un bouton avec une icône de suppression est affiché à côté de chaque tâche.
-   Il appelle la fonction `handleDelete(id)` qui :
-   Envoie une requête `DELETE` vers `/tasks/:id`
-   Supprime localement la tâche de l'état `tasks`

### 4\. Modification de tâche

-   Le champ `TextField` de chaque tâche est éditable directement.
-   Lorsque l’utilisateur modifie le texte, il est stocké dans l’état `taskEditing`.
-   Un bouton "Mettre à jour" envoie :
-   Une requête `PUT` vers `/tasks/:id` avec le nouveau nom
-   Puis recharge la liste des tâches

## UI 
-   Interface responsive et claire grâce à Material UI
-   Validation de champ : empêche l’ajout ou la modification de tâches vides
-   Expérience fluide avec mise à jour en temps réel des tâches

## Backend 

- https://github.com/nassimelaouad/todo_backend
