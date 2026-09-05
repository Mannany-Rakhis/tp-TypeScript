import type { Personnage } from "../models/personnage";

export const XP_PAR_NIVEAU = 100;

export function ajouterExperience(heros: Personnage, gain: number): number {
  heros.experience += gain;
  let niveauxGagnes = 0;

  // while conserve l'XP excedentaire et gere plusieurs niveaux dans un seul gain.
  while (heros.experience >= XP_PAR_NIVEAU) {
    heros.experience -= XP_PAR_NIVEAU;
    heros.niveau += 1;
    heros.pvMax += 20;
    heros.attaque += 3;
    heros.defense += 2;
    heros.pvActuels = heros.pvMax;
    niveauxGagnes += 1;
  }
  return niveauxGagnes;
}
