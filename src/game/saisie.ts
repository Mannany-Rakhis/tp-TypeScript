import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import type { ClasseHero } from "../models";
import { estClasseValide } from "../data/classes";

const terminal = createInterface({ input: stdin, output: stdout });

export function demander(texte: string): Promise<string> {
  return terminal.question(texte);
}

export async function demanderNom(): Promise<string> {
  while (true) {
    const nom = (await demander("Quel est ton nom, heros ? ")).trim();
    if (nom.length > 0) return nom;
    console.log("Un heros doit avoir un nom.");
  }
}

export async function demanderClasse(): Promise<ClasseHero> {
  while (true) {
    const saisie = (await demander("Classe (Guerrier, Mage, Archer): ")).trim();
    const normalisee = saisie.charAt(0).toUpperCase() + saisie.slice(1).toLowerCase();
    if (estClasseValide(normalisee)) return normalisee;
    console.log("Classe inconnue.");
  }
}

export function fermerSaisie(): void {
  terminal.close();
}
