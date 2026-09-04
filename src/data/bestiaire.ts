import type { DefinitionZone, EspeceMonstre, Monstre } from "../models";

export const ESPECES_MONSTRES = {
  ratGeant: { nom: "Rat geant", pvMax: 35, attaque: 8, defense: 2, xpDonnee: 40, orDonne: 12 },
  gobelin: { nom: "Gobelin", pvMax: 55, attaque: 12, defense: 4, xpDonnee: 65, orDonne: 20 },
  loupMutex: { nom: "Loup des Mutex", pvMax: 70, attaque: 14, defense: 5, xpDonnee: 85, orDonne: 30 },
  troll: { nom: "Troll", pvMax: 90, attaque: 16, defense: 6, xpDonnee: 110, orDonne: 40 },
  golemBytecode: { nom: "Golem de bytecode", pvMax: 105, attaque: 17, defense: 8, xpDonnee: 140, orDonne: 60 }
} as const satisfies {
  ratGeant: EspeceMonstre;
  gobelin: EspeceMonstre;
  loupMutex: EspeceMonstre;
  troll: EspeceMonstre;
  golemBytecode: EspeceMonstre;
};

export const ZONES: readonly DefinitionZone[] = [
  { nom: "la Foret des Types", especes: [ESPECES_MONSTRES.ratGeant, ESPECES_MONSTRES.gobelin] },
  { nom: "les Cavernes de l Any", especes: [ESPECES_MONSTRES.gobelin, ESPECES_MONSTRES.loupMutex, ESPECES_MONSTRES.troll] },
  { nom: "le Pic du Generique", especes: [ESPECES_MONSTRES.troll, ESPECES_MONSTRES.golemBytecode] }
];

export function spawnMonstre(espece: EspeceMonstre): Monstre {
  return { nom: espece.nom, pv: espece.pvMax, pvMax: espece.pvMax, attaque: espece.attaque, defense: espece.defense, xpDonnee: espece.xpDonnee, orDonne: espece.orDonne };
}
