import type { EtatPartie, Personnage } from "../models";
import { ZONES } from "../data/bestiaire";

export function afficherTitre(): void {
  console.log("==============================");
  console.log("TYPEQUEST - RPG TypeScript strict");
  console.log("==============================");
}

export function afficherFicheHeros(heros: Personnage): void {
  console.log(`\n${heros.nom} - ${heros.classe}`);
  console.log(`PV ${heros.pvActuels}/${heros.pvMax} | ATQ ${heros.attaque} | DEF ${heros.defense}`);
  console.log(`Niveau ${heros.niveau} | XP ${heros.experience}/100 | Or ${heros.or}`);
}

export function afficherEcranDefaite(etat: EtatPartie, lieu: string): void {
  console.log("\n==============================");
  console.log("DEFAITE");
  console.log("==============================");
  console.log(`${etat.heros.nom} est tombe ${lieu}, zone ${etat.zoneAtteinte}/${ZONES.length}.`);
  console.log(`Niveau atteint: ${etat.heros.niveau}`);
}

export function afficherEcranVictoire(etat: EtatPartie): void {
  console.log("\n==============================");
  console.log("VICTOIRE TOTALE");
  console.log("==============================");
  console.log(`Heros: ${etat.heros.nom} (${etat.heros.classe})`);
  console.log(`Niveau final: ${etat.heros.niveau} | XP: ${etat.heros.experience} | Or: ${etat.heros.or}`);
  console.log(`Monstres vaincus: ${etat.monstresVaincus}`);
}
