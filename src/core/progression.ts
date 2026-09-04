import type { Personnage } from "../models";

const XP_PAR_NIVEAU = 100;

export function accorderExperience(heros: Personnage, xpGagnee: number): number {
  heros.experience += xpGagnee;
  let niveauxGagnes = 0;
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

export function soigner(heros: Personnage, montant: number): number {
  const avant = heros.pvActuels;
  heros.pvActuels = Math.min(heros.pvMax, avant + montant);
  return heros.pvActuels - avant;
}

export function accorderOr(heros: Personnage, montant: number): void {
  heros.or += montant;
}
