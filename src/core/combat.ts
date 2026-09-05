import type { Monstre } from "../models/monstre";
import type { Personnage } from "../models/personnage";
import type { ResultatCombat } from "../models/types";

const VARIANCE_DEGATS = 0.15;

export function isAlive(pv: number): boolean {
  return pv > 0;
}

// Degats bruts = attaque - defense (jamais sous 1), module par +/-15%
// pour eviter des combats parfaitement deterministes.
function infligerDegats(attaque: number, defense: number, random: () => number): number {
  const brut = Math.max(1, attaque - defense);
  const facteur = 1 + (random() * 2 - 1) * VARIANCE_DEGATS;
  return Math.max(1, Math.round(brut * facteur));
}

function afficherEtat(nom: string, pv: number, pvMax: number): void {
  console.log(`${nom} [${pv}/${pvMax} PV]`);
}

export function lancerCombat(
  heros: Personnage,
  monstre: Monstre,
  random: () => number = Math.random
): ResultatCombat {
  console.log("══════════════════════════════");
  console.log("⚔️ COMBAT");
  console.log("══════════════════════════════");
  afficherEtat(heros.nom, heros.pvActuels, heros.pvMax);
  console.log("VS");
  afficherEtat(monstre.nom, monstre.pv, monstre.pvMax);
  console.log("------------------------------");

  while (isAlive(heros.pvActuels) && isAlive(monstre.pv)) {
    const degatsHeros = infligerDegats(heros.attaque, monstre.defense, random);
    monstre.pv = Math.max(0, monstre.pv - degatsHeros);
    console.log(`${heros.nom} attaque ${monstre.nom}.`);
    console.log(`${degatsHeros} degats !`);
    afficherEtat(monstre.nom, monstre.pv, monstre.pvMax);

    if (!isAlive(monstre.pv)) {
      console.log(`${monstre.nom} est vaincu !`);
      return "victoire";
    }

    console.log("------------------------------");
    const degatsMonstre = infligerDegats(monstre.attaque, heros.defense, random);
    heros.pvActuels = Math.max(0, heros.pvActuels - degatsMonstre);
    console.log(`${monstre.nom} attaque ${heros.nom}.`);
    console.log(`${degatsMonstre} degats !`);
    afficherEtat(heros.nom, heros.pvActuels, heros.pvMax);
    console.log("------------------------------");
  }

  return "defaite";
}
