import type { ClasseHero } from "./types";
import type { Objet } from "./objet";

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
  inventaire: Objet[];
  monstresVaincus: number;
}
