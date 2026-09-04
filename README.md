# TypeQuest

Mini-jeu de role CLI en TypeScript strict.

| Champ | Valeur |
|---|---|
| Nom : Rakhis | RANDRIAMANANTENASOA
| Prenom : Mannany | Lovaniaina Sitraka

## Installation

Prerequis : Node.js 18 ou plus recent et npm.

```bash
npm install
```

## Lancement

```bash
npm start
```

Compilation seule :

```bash
npm run build
```

Mode surveillance :

```bash
npm run watch
```

## Fonctionnalites realisees

- TypeScript strict avec `strict: true`, `noUncheckedIndexedAccess` et aucun `any`.
- Trois classes : Guerrier, Mage et Archer, avec validation a la compilation et a la saisie.
- Trois zones et un monstre cree par factory a chaque rencontre.
- Combat au tour par tour, formule `attaque - defense`, minimum de 1 degat et PV bornes a 0.
- Boss final dans une table separee du bestiaire aleatoire.
- XP, niveaux multiples, XP restante conservee, amelioration des statistiques et restauration des PV.
- Inventaire numerote : les potions restaurent les PV sans depasser le maximum ; les armes donnent un bonus d attaque permanent puis sont retirees.
- Butin pondere : 60 % rien, 30 % potion et 10 % arme.
- Etat du heros conserve entre les zones et ecrans de victoire ou defaite.

## Difficultes rencontrees

- Maintenir des unions litterales strictes tout en validant les saisies utilisateur, qui arrivent sous forme de `string`.
- Garantir l independance des instances de monstres grace a une factory.
- Arreter immediatement un combat apres la mort d un participant et conserver l XP excedentaire lors de plusieurs niveaux.
