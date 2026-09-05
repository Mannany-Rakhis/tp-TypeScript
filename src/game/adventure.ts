import { spawnBoss } from "../data/boss";
import { spawnMonstreZone } from "../data/bestiary";
import { creerButin, tirerTypeButin } from "../data/loot";
import { lancerCombat } from "../core/combat";
import { afficherInventaire, ajouterObjet, utiliserObjet } from "../core/inventory";
import { ajouterExperience, XP_PAR_NIVEAU } from "../core/progression";
import type { Personnage } from "../models/personnage";

const ZONES = ["Foret des Types", "Donjon des Interfaces", "Montagnes du Runtime"] as const;

function afficherHeros(heros: Personnage): void {
  console.log(`\n${heros.nom} | Classe: ${heros.classe}`);
  console.log(`PV: ${heros.pvActuels}/${heros.pvMax} | ATQ: ${heros.attaque} | DEF: ${heros.defense}`);
  console.log(`Niveau: ${heros.niveau} | XP: ${heros.experience}/${XP_PAR_NIVEAU} | Or: ${heros.or}`);
}

async function proposerObjet(heros: Personnage, demander: (question: string) => Promise<string>): Promise<void> {
  if (heros.inventaire.length === 0) return;
  afficherInventaire(heros);
  const choix = await demander("Utiliser un objet maintenant (numero, ou Entree pour continuer) ? ");
  if (choix.trim() === "") return;
  const index = Number(choix) - 1;
  if (!Number.isInteger(index) || !utiliserObjet(heros, index)) {
    console.log("Choix d'objet invalide.");
  }
}

function appliquerVictoire(heros: Personnage, xp: number, or: number): void {
  heros.or += or;
  const niveaux = ajouterExperience(heros, xp);
  console.log(`Recompense: +${xp} XP, +${or} or.`);
  if (niveaux > 0) console.log(`Niveau augmente ! ${heros.niveau} (PV restaures et stats ameliorees).`);
}

export async function lancerAventure(
  heros: Personnage,
  demander: (question: string) => Promise<string>,
  fermerLecteur: () => void = () => undefined
): Promise<void> {
  try {
    console.log("\n=== TYPEQUEST ===");
    console.log("Une aventure CLI ou chaque type compte.\n");
    for (let indexZone = 0; indexZone < ZONES.length; indexZone += 1) {
      const zone = ZONES[indexZone];
      const monstre = spawnMonstreZone(indexZone);
      console.log(`\nZONE ${indexZone + 1}/3 - Vous avancez dans la ${zone}...`);
      console.log(`Un ${monstre.nom} apparait !`);
      const resultat = lancerCombat(heros, monstre);
      if (resultat === "defaite") {
        afficherDefaite(heros, indexZone + 1);
        return;
      }
      heros.monstresVaincus += 1;
      appliquerVictoire(heros, monstre.xpDonne, monstre.orDonne);
      const butin = creerButin(tirerTypeButin());
      if (butin) {
        ajouterObjet(heros, butin);
        console.log(`Butin obtenu: ${butin.nom}.`);
      } else {
        console.log("Butin: rien cette fois.");
      }
      afficherHeros(heros);
      await proposerObjet(heros, demander);
    }

    console.log("\n=== BOSS FINAL ===");
    const boss = spawnBoss();
    const resultatBoss = lancerCombat(heros, boss);
    if (resultatBoss === "defaite") {
      afficherDefaite(heros, 4);
      return;
    }
    heros.monstresVaincus += 1;
    appliquerVictoire(heros, boss.xpDonne, boss.orDonne);
    afficherVictoire(heros);
  } finally {
    fermerLecteur();
  }
}

function afficherDefaite(heros: Personnage, zone: number): void {
  console.log("\n╔══════════════════════════════╗");
  console.log("║          DEFAITE             ║");
  console.log("╚══════════════════════════════╝");
  console.log(`${heros.nom} est tombe a 0 PV dans la zone ${zone}.`);
  console.log(`Niveau atteint: ${heros.niveau}.`);
}

function afficherVictoire(heros: Personnage): void {
  console.log("\n╔══════════════════════════════╗");
  console.log("║          VICTOIRE            ║");
  console.log("╚══════════════════════════════╝");
  console.log(`Heros: ${heros.nom} (${heros.classe})`);
  console.log(`Niveau final: ${heros.niveau} | XP: ${heros.experience} | Or: ${heros.or}`);
  console.log(`Monstres vaincus: ${heros.monstresVaincus}`);
}
