import type { Monstre } from "../models/monstre";

export const BOSS_FINAL: Monstre = {
  nom: "Le Dragon de TypeScript",
  pv: 220,
  pvMax: 220,
  attaque: 28,
  defense: 12,
  xpDonne: 300,
  orDonne: 100
};

export function spawnBoss(): Monstre {
  return { ...BOSS_FINAL, pv: BOSS_FINAL.pvMax };
}
