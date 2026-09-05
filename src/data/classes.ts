import type { ClasseHero } from "../models/types";
import type { Personnage } from "../models/personnage";

interface StatsClasse {
  pvMax: number;
  attaque: number;
  defense: number;
}

export const STATS_CLASSES: Record<ClasseHero, StatsClasse> = {
  Guerrier: { pvMax: 120, attaque: 15, defense: 10 },
  Mage: { pvMax: 80, attaque: 25, defense: 5 },
  Archer: { pvMax: 100, attaque: 20, defense: 7 }
};

export function creerPersonnage(nom: string, classe: ClasseHero): Personnage {
  const stats = STATS_CLASSES[classe];
  return {
    nom,
    classe,
    pvActuels: stats.pvMax,
    pvMax: stats.pvMax,
    attaque: stats.attaque,
    defense: stats.defense,
    niveau: 1,
    experience: 0,
    or: 0,
    inventaire: [],
    monstresVaincus: 0
  };
}
