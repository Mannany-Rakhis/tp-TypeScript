import type { TiragePondere } from "../models";

export function entierAleatoire(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function elementAleatoire<T>(elements: readonly T[]): T {
  if (elements.length === 0) throw new Error("Tirage impossible : liste vide.");
  const element = elements[entierAleatoire(0, elements.length - 1)];
  if (element === undefined) throw new Error("Tirage incoherent : index hors bornes.");
  return element;
}

/** Tirage par segments cumules : 60/30/10 donne exactement les poids annonces. */
export function tiragePondere<T>(elements: readonly TiragePondere<T>[]): T {
  const poidsTotal = elements.reduce((total, element) => total + element.poids, 0);
  if (poidsTotal <= 0) throw new Error("Tirage pondere impossible : poids nul.");
  let jet = Math.random() * poidsTotal;
  for (const element of elements) {
    jet -= element.poids;
    if (jet < 0) return element.valeur;
  }
  throw new Error("Tirage pondere incoherent.");
}
