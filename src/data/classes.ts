import type { ClasseHero, StatsClasse } from "../models";

export const STATS_INITIALES: Readonly<Record<ClasseHero, StatsClasse>> = {
  Guerrier: { pvMax: 120, attaque: 15, defense: 10 },
  Mage: { pvMax: 80, attaque: 25, defense: 5 },
  Archer: { pvMax: 100, attaque: 20, defense: 7 }
};

export const CLASSES_DISPONIBLES: readonly ClasseHero[] = ["Guerrier", "Mage", "Archer"];

export function estClasseValide(valeur: string): valeur is ClasseHero {
  return (CLASSES_DISPONIBLES as readonly string[]).includes(valeur);
}
