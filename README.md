# TypeQuest

## Nom/Prenom

- Nom : Rakhis | RANDRIAMANANTENASOA
- Prenom : Mannany | Sitraka

## Installation

Prerequis : Node.js 18 ou version plus recente.

```bash
npm install
```

## Lancement

```bash
npm start
```

Pour compiler sans lancer le jeu :

```bash
npm run build
```

## Fonctionnalites realisees

- Jeu de role en terminal, sans interface graphique.
- Trois classes strictement typees : `Guerrier`, `Mage` et `Archer`.
- Bestiaire reparti par zone (le pool de monstres rencontres se durcit progressivement de la zone 1 a la zone 3) ; un monstre genere par factory a chaque rencontre, sans aucun etat partage entre deux rencontres du meme type.
- Combat au tour par tour : le heros attaque en premier, degats minimum de 1, PV toujours clamps a 0, et une legere variance aleatoire (+/-15 %) sur les degats pour eviter des combats parfaitement deterministes.
- Boss final separe du pool des rencontres aleatoires.
- Inventaire avec potions et armes. Une potion soigne de 35 PV sans depasser le maximum et une arme augmente l'attaque de 5, puis l'objet est consomme.
- XP, or, niveaux multiples en un gain, XP excedentaire conservee et restauration complete des PV a chaque niveau.
- Butin pondere : 60 % rien, 30 % potion, 10 % arme.
- Ecrans de defaite et de victoire avec resume de partie.

## Difficultes rencontrees

- Garantir la validation de classe a la fois au niveau TypeScript et au moment de la saisie utilisateur.
- Maintenir un etat mutable unique du heros entre les zones sans partager l'etat des monstres.
- Arreter immediatement le combat apres la mort d'un participant et conserver l'XP excedentaire lors des passages de niveau.
- Equilibrage du Troll : en piochant dans tout le bestiaire des la zone 1, un heros tout juste cree (en particulier le Mage, peu resistant) pouvait perdre la quasi-totalite de ses PV avant meme d'avoir gagne un niveau. Correction en repartissant les monstres par zone (les plus faciles en zone 1) et en revoyant les statistiques du Troll (attaque baissee, defense augmentee).
