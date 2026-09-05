import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { creerPersonnage } from "./data/classes";
import { lancerAventure } from "./game/adventure";
import type { ClasseHero } from "./models/types";

const CLASSES_VALIDES: readonly ClasseHero[] = ["Guerrier", "Mage", "Archer"];

function estClasseHero(valeur: string): valeur is ClasseHero {
  return CLASSES_VALIDES.includes(valeur as ClasseHero);
}

async function demanderClasse(demander: (question: string) => Promise<string>): Promise<ClasseHero> {
  while (true) {
    const valeur = (await demander("Choisissez une classe (Guerrier, Mage, Archer): ")).trim();
    if (estClasseHero(valeur)) return valeur;
    console.log("Classe invalide. Choisissez exactement Guerrier, Mage ou Archer.");
  }
}

async function main(): Promise<void> {
  const lecteur = createInterface({ input, output });
  const demander = (question: string): Promise<string> => lecteur.question(question);
  try {
    const nom = (await demander("Nom de votre heros: ")).trim() || "Heros sans nom";
    const classe = await demanderClasse(demander);
    await lancerAventure(creerPersonnage(nom, classe), demander);
  } finally {
    lecteur.close();
  }
}

void main().catch((erreur: unknown) => {
  const message = erreur instanceof Error ? erreur.message : "Erreur inconnue";
  console.error(`Erreur: ${message}`);
  process.exitCode = 1;
});
