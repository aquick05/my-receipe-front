// useMemo = évite de recalculer si les données n'ont pas changé
import { useMemo } from "react";

// useWindowDimensions = donne width/height EN TEMPS RÉEL
// Se met à jour automatiquement quand l'utilisateur tourne son téléphone
import { useWindowDimensions } from "react-native";

export function useResponsive() {
  // width  = largeur en px
  // height = hauteur en px
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    //  ORIENTATION

    const isLandscape = width > height;
    const isPortrait = !isLandscape;

    //TYPE D'APPAREIL
    const isSmallPhone = width < 360;
    const isPhone = width < 768;
    const isTablet = width >= 768;

    // on prend le PETIT côté comme référence.
    const base = Math.min(width, height);

    //  PADDING HORIZONTAL
    // Sur un téléphone, on veut un padding de 16px (ou 12px si très petit) 40 px pour les tablettes.
    const horizontalPadding = isTablet ? 40 : isSmallPhone ? 12 : 16;

    //  COLONNES POUR LES GRILLES
    // Tablette paysage  → 3 colonnes
    // Tablette portrait → 2 colonnes
    // Téléphone paysage → 2 colonnes
    // Téléphone portrait → 1 colonne
    const columns = isTablet ? (isLandscape ? 3 : 2) : isLandscape ? 2 : 1;

    //  LARGEUR MAX D'UNE CARD / FORMULAIRE
    // Un formulaire ne doit pas s'étirer sur toute la largeur d'un iPad.
    // Math.min(a, b) = prend la plus petite des deux valeurs

    const cardMaxWidth = isTablet
      ? Math.min(width * 0.6, 600) // tablette : 60% max 600px
      : isLandscape
        ? Math.min(width * 0.8, 560) // téléphone paysage : 80% max 560px
        : width * 0.88; // téléphone portrait : 88%

    //  PADDING VERTICAL
    // Sur un téléphone, on veut un padding de 16px (ou 8px si très petit) 40 px pour les tablettes.
    const verticalPadding = isLandscape ? 8 : 16;

    // On retourne tout dans un objet.
    // const { isTablet, base, columns } = useResponsive() deconstruction
    return {
      width,
      height,
      base,
      isLandscape,
      isPortrait,
      isSmallPhone,
      isPhone,
      isTablet,
      columns,
      horizontalPadding,
      cardMaxWidth,
      verticalPadding,
    };
  }, [width, height]); // recalcule SEULEMENT si width ou height change
}
