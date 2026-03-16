//base de référence pour les calculs de taille responsive (en pixels)
const BASE_REF = 390;

// Calcule une taille proportionnelle à l'écran réel.
// Formule : (taille_souhaitée / écran_référence) × écran_réel
//rs = responsive size
export const rs = (size, base) => {
  // Math.round arrondit au pixel entier (pas de 15.7px)
  return Math.round((size / BASE_REF) * base);
};

// Jamais en dessous de 13px, jamais au-dessus de 24px
//rsc = responsive size with constraints
export const rsc = (size, base, min, max) => {
  const scaled = rs(size, base); // on calcule la taille proportionnelle
  return Math.min(
    // on prend le plus petit entre scaled et max
    Math.max(scaled, min), // on prend le plus grand entre scaled et min
    max,
  );
};

// Plancher automatique : 80% de la taille d'origine
// Plafond automatique  : 150% de la taille d'origine
// rf = Responsive Font
export const rf = (size, base) => {
  return rsc(
    size,
    base,
    Math.round(size * 0.8), // plancher auto = 80% de size
    Math.round(size * 1.5), // plafond auto  = 150% de size
  );
};
