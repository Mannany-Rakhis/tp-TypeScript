import type { Objet, Personnage } from "../models";
import { soigner } from "./progression";

export function ajouterObjet(inventaire: Objet[], objet: Objet): void {
  inventaire.push({ ...objet });
}

export function afficherInventaire(inventaire: readonly Objet[]): void {
  if (inventaire.length === 0) {
    console.log("Inventaire vide.");
    return;
  }
  console.log("Inventaire:");
  inventaire.forEach((objet, index) => {
    const effet = objet.categorie === "Potion" ? `restaure ${objet.valeur} PV` : `+${objet.valeur} ATQ permanente`;
    console.log(`${index + 1}. ${objet.nom} [${objet.categorie}] - ${effet}`);
  });
}

export function utiliserObjet(heros: Personnage, inventaire: Objet[], index: number): string | null {
  const objet = inventaire[index];
  if (objet === undefined) return null;
  if (objet.categorie === "Potion") {
    if (heros.pvActuels >= heros.pvMax) return `${heros.nom} est deja a pleine vie.`;
    const soin = soigner(heros, objet.valeur);
    inventaire.splice(index, 1);
    return `${objet.nom}: +${soin} PV (${heros.pvActuels}/${heros.pvMax}).`;
  }
  heros.attaque += objet.valeur;
  inventaire.splice(index, 1);
  return `${objet.nom} equipee: +${objet.valeur} ATQ (${heros.attaque}).`;
}
