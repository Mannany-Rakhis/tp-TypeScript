import type { Monstre, Personnage, ResultatCombat } from "../models";

const SEPARATEUR = "------------------------------";

export function calculerDegats(attaque: number, defense: number): number {
  return Math.max(1, attaque - defense);
}

export function herosEstVivant(heros: Personnage): boolean {
  return heros.pvActuels > 0;
}

function retirerPv(pv: number, degats: number): number {
  return Math.max(0, pv - degats);
}

function journaliser(attaquant: string, cible: string, degats: number, pv: number, pvMax: number): void {
  console.log(`${attaquant} attaque ${cible} !`);
  console.log(`${degats} degats !`);
  console.log(`${cible} [${pv}/${pvMax}]`);
  console.log(SEPARATEUR);
}

export function menerCombat(heros: Personnage, monstre: Monstre): ResultatCombat {
  console.log("==============================");
  console.log("COMBAT");
  console.log("==============================");
  console.log(`${heros.nom} [${heros.pvActuels}/${heros.pvMax}]`);
  console.log("VS");
  console.log(`${monstre.nom} [${monstre.pv}/${monstre.pvMax}]`);
  console.log(SEPARATEUR);

  while (herosEstVivant(heros) && monstre.pv > 0) {
    const degatsHeros = calculerDegats(heros.attaque, monstre.defense);
    monstre.pv = retirerPv(monstre.pv, degatsHeros);
    journaliser(heros.nom, monstre.nom, degatsHeros, monstre.pv, monstre.pvMax);

    if (monstre.pv <= 0) break;

    const degatsMonstre = calculerDegats(monstre.attaque, heros.defense);
    heros.pvActuels = retirerPv(heros.pvActuels, degatsMonstre);
    journaliser(monstre.nom, heros.nom, degatsMonstre, heros.pvActuels, heros.pvMax);
  }
  return herosEstVivant(heros) ? "victoire" : "defaite";
}
