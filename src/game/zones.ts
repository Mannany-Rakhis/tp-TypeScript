import type { DefinitionZone, EtatPartie, Objet, ResultatCombat, TypeButin } from "../models";
import { ZONES, spawnMonstre } from "../data/bestiaire";
import { ARMES, POTIONS, TABLE_BUTIN } from "../data/loot";
import { elementAleatoire, tiragePondere } from "../core/rng";
import { menerCombat } from "../core/combat";
import { accorderExperience, accorderOr } from "../core/progression";
import { ajouterObjet } from "../core/inventaire";

export function jouerZone(etat: EtatPartie, numero: number, zone: DefinitionZone): ResultatCombat {
  const monstre = spawnMonstre(elementAleatoire(zone.especes));
  console.log(`\nZONE ${numero}/${ZONES.length} - Vous avancez dans ${zone.nom}...`);
  console.log(`Un ${monstre.nom} apparait !`);
  const issue = menerCombat(etat.heros, monstre);
  if (issue === "defaite") return issue;

  etat.monstresVaincus += 1;
  accorderOr(etat.heros, monstre.orDonne);
  const niveaux = accorderExperience(etat.heros, monstre.xpDonnee);
  console.log(`+${monstre.xpDonnee} XP | +${monstre.orDonne} or`);
  if (niveaux > 0) console.log(`${niveaux} niveau(x) gagne(s), PV restaures.`);
  tirerButin(etat.inventaire);
  return issue;
}

function tirerButin(inventaire: Objet[]): void {
  const type: TypeButin = tiragePondere(TABLE_BUTIN);
  if (type === "rien") {
    console.log("Butin: rien.");
    return;
  }
  const objet = type === "potion" ? elementAleatoire(POTIONS) : elementAleatoire(ARMES);
  ajouterObjet(inventaire, objet);
  console.log(`Butin: ${objet.nom}.`);
}
