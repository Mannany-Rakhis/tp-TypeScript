export type ClasseHero = "Guerrier" | "Mage" | "Archer";

export interface StatsClasse {
  readonly pvMax: number;
  readonly attaque: number;
  readonly defense: number;
}

export interface Personnage {
  nom: string;
  classe: ClasseHero;
  pvActuels: number;
  pvMax: number;
  attaque: number;
  defense: number;
  niveau: number;
  experience: number;
  or: number;
}

export interface EspeceMonstre {
  readonly nom: string;
  readonly pvMax: number;
  readonly attaque: number;
  readonly defense: number;
  readonly xpDonnee: number;
  readonly orDonne: number;
}

export interface Monstre {
  nom: string;
  pv: number;
  pvMax: number;
  attaque: number;
  defense: number;
  xpDonnee: number;
  orDonne: number;
}

export type CategorieObjet = "Potion" | "Arme";
export interface Objet {
  nom: string;
  categorie: CategorieObjet;
  valeur: number;
}

export type ResultatCombat = "victoire" | "defaite";
export type TypeButin = "rien" | "potion" | "arme";

export interface TiragePondere<T> {
  readonly poids: number;
  readonly valeur: T;
}

export interface EtatPartie {
  heros: Personnage;
  inventaire: Objet[];
  monstresVaincus: number;
  zoneAtteinte: number;
}

export interface DefinitionZone {
  readonly nom: string;
  readonly especes: readonly EspeceMonstre[];
}
