import type { Objet, TirageButin } from "../models";

export const POTIONS: readonly Objet[] = [
  { nom: "Potion de soin mineure", categorie: "Potion", valeur: 25 },
  { nom: "Potion de soin", categorie: "Potion", valeur: 45 }
];

export const ARMES: readonly Objet[] = [
  { nom: "Dague en const", categorie: "Arme", valeur: 4 },
  { nom: "Epee d acier strict", categorie: "Arme", valeur: 7 },
  { nom: "Lame de narrowing", categorie: "Arme", valeur: 10 }
];

export const TABLE_BUTIN: readonly TirageButin[] = [
  { poids: 60, valeur: "rien" },
  { poids: 30, valeur: "potion" },
  { poids: 10, valeur: "arme" }
];
