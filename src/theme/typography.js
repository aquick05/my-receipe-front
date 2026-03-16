// Centralisation de toutes les tailles de police

export function getTypography(base) {
  return {
    //  Titres (du plus grand au plus petit)

    // h1 : Titre principal d'un écran (ex: "Mes recettes")
    h1: Math.round(base * 0.068),

    // h2 : Titre de section ou sous-page (ex: "Connexion")
    h2: Math.round(base * 0.054),

    // h3 : Titre d'une card ou d'un groupe (ex: "Ingrédients")
    h3: Math.round(base * 0.042),

    //  Corps de texte

    // body : Texte principal, descriptions, contenu
    body: Math.round(base * 0.038),

    // label : Labels des champs de formulaire, sous-titres de card
    label: Math.round(base * 0.033),

    // small : Textes secondaires, timestamps, hints
    small: Math.round(base * 0.028),

    // ── Éléments d'interface ──────────────────────────────────

    // button : Texte des boutons
    button: Math.round(base * 0.04),

    // placeholder : Texte de placeholder dans les inputs
    placeholder: Math.round(base * 0.036),

    // badge : Texte dans les petits badges/tags de catégorie
    badge: Math.round(base * 0.026),
  };
}
