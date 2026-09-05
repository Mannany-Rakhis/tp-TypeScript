import type { CategorieObjet } from "./types";

export interface ObjetBase {
  nom: string;
  categorie: CategorieObjet;
  valeur: number;
}

export interface Potion extends ObjetBase {
  categorie: "Potion";
  valeur: number;
}

export interface Arme extends ObjetBase {
  categorie: "Arme";
  valeur: number;
}

export type Objet = Potion | Arme;
