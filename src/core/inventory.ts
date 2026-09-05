import type { Objet } from "../models/objet";
import type { Personnage } from "../models/personnage";

// Fonctions pures operant sur heros.inventaire, dans le meme style
// fonctionnel que combat.ts et progression.ts (pas de classe ici : un
// inventaire n'a pas de comportement propre, seulement des donnees).

export function ajouterObjet(heros: Personnage, objet: Objet): void {
  heros.inventaire.push(objet);
}

export function afficherInventaire(heros: Personnage): void {
  if (heros.inventaire.length === 0) {
    console.log("Inventaire vide.");
    return;
  }
  console.log("Inventaire:");
  heros.inventaire.forEach((objet, index) => {
    console.log(`${index + 1}. ${objet.nom} (${objet.categorie}, valeur: ${objet.valeur})`);
  });
}

export function utiliserObjet(heros: Personnage, index: number): boolean {
  const objet = heros.inventaire[index];
  if (!objet) return false;

  if (objet.categorie === "Potion") {
    const anciensPv = heros.pvActuels;
    heros.pvActuels = Math.min(heros.pvMax, heros.pvActuels + objet.valeur);
    console.log(`${objet.nom}: ${anciensPv} -> ${heros.pvActuels} PV.`);
  } else {
    heros.attaque += objet.valeur;
    console.log(`${objet.nom}: +${objet.valeur} ATQ. Attaque actuelle: ${heros.attaque}.`);
  }
  heros.inventaire.splice(index, 1);
  return true;
}
