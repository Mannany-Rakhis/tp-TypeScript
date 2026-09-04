import type { EspeceMonstre, Objet, TirageButin, TypeButin } from "../models";

function indexAleatoire(taille: number): number {
  return Math.floor(Math.random() * taille);
}

export function choisirEspece(especes: readonly EspeceMonstre[]): EspeceMonstre {
  if (especes.length === 0) {
    throw new Error("Impossible de choisir un monstre dans une zone vide.");
  }
  const espece = especes[indexAleatoire(especes.length)];
  if (espece === undefined) {
    throw new Error("Espece de monstre introuvable.");
  }
  return espece;
}

export function choisirObjet(objets: readonly Objet[]): Objet {
  if (objets.length === 0) {
    throw new Error("Impossible de choisir un objet dans une liste vide.");
  }
  const objet = objets[indexAleatoire(objets.length)];
  if (objet === undefined) {
    throw new Error("Objet introuvable.");
  }
  return objet;
}

export function tirerTypeButin(table: readonly TirageButin[]): TypeButin {
  const poidsTotal = table.reduce((total, ligne) => total + ligne.poids, 0);
  if (poidsTotal <= 0) {
    throw new Error("La table de butin ne contient aucun poids valide.");
  }

  let tirage = Math.random() * poidsTotal;
  for (const ligne of table) {
    tirage -= ligne.poids;
    if (tirage < 0) {
      return ligne.valeur;
    }
  }
  throw new Error("Aucun resultat de butin n a ete selectionne.");
}
