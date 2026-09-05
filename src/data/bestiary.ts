import type { Monstre } from "../models/monstre";

interface ModeleMonstre extends Omit<Monstre, "pv" | "pvMax"> {
  pv: number;
}

// Rat geant : monstre d'introduction, degats negligeables.
// Gobelin : monstre standard, sert de reference d'equilibrage.
// Troll : le plus resistant des monstres communs, mais reste bien
// en dessous du boss pour ne pas punir un heros qui vient d'etre cree.
const RAT_GEANT: ModeleMonstre = { nom: "Rat geant", pv: 35, attaque: 10, defense: 2, xpDonne: 40, orDonne: 12 };
const GOBELIN: ModeleMonstre = { nom: "Gobelin", pv: 60, attaque: 14, defense: 5, xpDonne: 70, orDonne: 22 };
const TROLL: ModeleMonstre = { nom: "Troll", pv: 100, attaque: 16, defense: 10, xpDonne: 120, orDonne: 40 };

// Le pool de monstres depend de la zone: la difficulte progresse avec
// l'aventure au lieu de piocher uniformement dans tout le bestiaire.
// Sans ce decoupage, un heros tout juste cree pouvait tomber sur le Troll
// des la zone 1 et se faire quasiment vider ses PV avant meme d'avoir un
// seul niveau ou objet : c'est ce decoupage qui corrige le probleme.
const POOLS_PAR_ZONE: readonly (readonly ModeleMonstre[])[] = [
  [RAT_GEANT, GOBELIN],
  [RAT_GEANT, GOBELIN, TROLL],
  [GOBELIN, TROLL]
];

function piocherModele(pool: readonly ModeleMonstre[], random: () => number): ModeleMonstre {
  const index = Math.min(Math.floor(random() * pool.length), pool.length - 1);
  return pool[index];
}

/** Une nouvelle instance est creee a chaque rencontre : aucun etat n'est partage
 * entre deux monstres du meme type. */
function instancier(modele: ModeleMonstre): Monstre {
  return { ...modele, pvMax: modele.pv };
}

/** Choisit un monstre aleatoire dans le pool associe a la zone (0 = premiere zone).
 * En dehors des index connus, retombe sur le pool le plus difficile. */
export function spawnMonstreZone(indexZone: number, random: () => number = Math.random): Monstre {
  const pool = POOLS_PAR_ZONE[indexZone] ?? POOLS_PAR_ZONE[POOLS_PAR_ZONE.length - 1];
  return instancier(piocherModele(pool, random));
}
