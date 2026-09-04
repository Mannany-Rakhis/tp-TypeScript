import { lancerAventure } from "./game/aventure";
import { fermerSaisie } from "./game/saisie";

async function principal(): Promise<void> {
  try {
    await lancerAventure();
  } finally {
    fermerSaisie();
  }
}

principal().catch((erreur: unknown) => {
  console.error("Erreur fatale:", erreur instanceof Error ? erreur.message : erreur);
  process.exitCode = 1;
});
