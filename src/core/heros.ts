import type { ClasseHero, Personnage, StatsClasse } from "../models";
import { STATS_INITIALES } from "../data/classes";

export function creerPersonnage(nom: string, classe: ClasseHero): Personnage {
  const stats: StatsClasse = STATS_INITIALES[classe];
  return { nom, classe, pvActuels: stats.pvMax, pvMax: stats.pvMax, attaque: stats.attaque, defense: stats.defense, niveau: 1, experience: 0, or: 0 };
}
