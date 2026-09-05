import type { Arme, Objet, Potion } from "../models/objet";
import type { TypeButin } from "../models/types";

export function tirerTypeButin(random: () => number = Math.random): TypeButin {
  const tirage = random();
  // Intervalles cumules: 0-60% rien, 60-90% potion, 90-100% arme.
  if (tirage < 0.6) return "rien";
  if (tirage < 0.9) return "potion";
  return "arme";
}

export function creerButin(type: TypeButin): Objet | null {
  if (type === "potion") {
    const potion: Potion = { nom: "Potion de soin", categorie: "Potion", valeur: 35 };
    return potion;
  }
  if (type === "arme") {
    const arme: Arme = { nom: "Lame renforcee", categorie: "Arme", valeur: 5 };
    return arme;
  }
  return null;
}
