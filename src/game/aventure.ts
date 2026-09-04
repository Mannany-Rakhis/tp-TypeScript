import type { EtatPartie, ResultatCombat } from "../models";
import { ZONES, spawnMonstre } from "../data/bestiaire";
import { BOSS_FINAL } from "../data/boss";
import { creerPersonnage } from "../core/heros";
import { menerCombat } from "../core/combat";
import { accorderExperience, accorderOr } from "../core/progression";
import { afficherInventaire, utiliserObjet } from "../core/inventaire";
import { afficherEcranDefaite, afficherEcranVictoire, afficherFicheHeros, afficherTitre } from "./affichage";
import { demander, demanderClasse, demanderNom } from "./saisie";
import { jouerZone } from "./zones";

async function creerEtatInitial(): Promise<EtatPartie> {
  return {
    heros: creerPersonnage(await demanderNom(), await demanderClasse()),
    inventaire: [],
    monstresVaincus: 0,
    zoneAtteinte: 0
  };
}

export async function lancerAventure(): Promise<void> {
  afficherTitre();
  const etat = await creerEtatInitial();
  afficherFicheHeros(etat.heros);
  for (let index = 0; index < ZONES.length; index += 1) {
    const zone = ZONES[index];
    if (zone === undefined) throw new Error("Configuration des zones incomplete.");
    etat.zoneAtteinte = index + 1;
    if (jouerZone(etat, index + 1, zone) === "defaite") {
      afficherEcranDefaite(etat, `dans ${zone.nom}`);
      return;
    }
    afficherFicheHeros(etat.heros);
    await gererEscale(etat);
  }
  const issueBoss = affronterBoss(etat);
  if (issueBoss === "victoire") afficherEcranVictoire(etat);
  else afficherEcranDefaite(etat, "face au Dragon de TypeScript");
}

function affronterBoss(etat: EtatPartie): ResultatCombat {
  const boss = spawnMonstre(BOSS_FINAL);
  console.log("\nBOSS FINAL: Le Dragon de TypeScript apparait !");
  const issue = menerCombat(etat.heros, boss);
  if (issue === "victoire") {
    etat.monstresVaincus += 1;
    accorderOr(etat.heros, boss.orDonne);
    accorderExperience(etat.heros, boss.xpDonnee);
  }
  return issue;
}

async function gererEscale(etat: EtatPartie): Promise<void> {
  while (true) {
    console.log("\n--- Escale ---");
    console.log("1. Voir ma fiche");
    console.log("2. Voir mon inventaire");
    console.log("3. Utiliser un objet");
    console.log("4. Reprendre la route");
    const choix = (await demander("Ton choix: ")).trim();
    switch (choix) {
      case "1": afficherFicheHeros(etat.heros); break;
      case "2": afficherInventaire(etat.inventaire); break;
      case "3": await utiliserObjetInteractif(etat); break;
      case "4": return;
      default: console.log("Choix invalide.");
    }
  }
}

async function utiliserObjetInteractif(etat: EtatPartie): Promise<void> {
  afficherInventaire(etat.inventaire);
  if (etat.inventaire.length === 0) return;
  const saisie = (await demander("Numero de l objet (0 pour annuler): ")).trim();
  const numero = Number.parseInt(saisie, 10);
  if (!Number.isInteger(numero) || numero <= 0) {
    console.log("Annule.");
    return;
  }
  console.log(utiliserObjet(etat.heros, etat.inventaire, numero - 1) ?? "Objet introuvable.");
}
