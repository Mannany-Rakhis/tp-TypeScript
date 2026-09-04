import type { Monstre, Personnage, ResultatCombat } from "../models";

const SEPARATEUR = "------------------------------";

export function calculerDegats(attaque: number, defense: number): number {
  return Math.max(1, attaque - defense);
}

export function herosEstVivant(heros: Personnage): boolean {
  return heros.pvActuels > 0;
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
    if (herosEstVivant(heros)) {
      const degats = calculerDegats(heros.attaque, monstre.defense);
      monstre.pv = Math.max(0, monstre.pv - degats);
      journaliser(heros.nom, monstre.nom, degats, monstre.pv, monstre.pvMax);
    }
    if (monstre.pv <= 0) break;
    if (monstre.pv > 0) {
      const degats = calculerDegats(monstre.attaque, heros.defense);
      heros.pvActuels = Math.max(0, Math.min(heros.pvMax, heros.pvActuels - degats));
      journaliser(monstre.nom, heros.nom, degats, heros.pvActuels, heros.pvMax);
    }
  }
  return herosEstVivant(heros) ? "victoire" : "defaite";
}
