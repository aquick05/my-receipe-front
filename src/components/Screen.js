// Ce composant règle automatiquement et une seule fois :
//   ✓ Les insets (encoche iPhone, barre de statut, nav Android)
//   ✓ Le padding horizontal adaptatif
//   ✓ Le KeyboardAvoidingView (clavier qui cache les inputs)
//   ✓ Le ScrollView (contenu qui dépasse l'écran)
//   ✓ La couleur de fond
//
// RECETTE PAR TYPE D'ÉCRAN :
//
//   Écran simple (pas d'input, pas de scroll) :
//   <Screen>...</Screen>
//
//   Écran avec scroll (liste longue, profil…) :
//   <Screen scroll>...</Screen>
//
//   Formulaire (inputs + clavier) :
//   <Screen scroll keyboard>...</Screen>
//
//   Page de login (formulaire centré) :
//   <Screen scroll keyboard centered>...</Screen>
//
//   Carte plein écran (pas de padding latéral) :
//   <Screen noPaddingH>...</Screen>
// ═══════════════════════════════════════════════════════════════

import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  // Platform permet de savoir si on est sur iOS ou Android
} from "react-native";

// useSafeAreaInsets = donne les zones occupées par le système
// insets.top    = hauteur de la barre de statut / encoche iPhone
// insets.bottom = barre de navigation Android / home indicator iPhone
// insets.left, insets.right = décalages en paysage sur certains iPhone
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useResponsive } from "../responsive/useResponsive";
import { colors } from "../theme/colors";

const Screen = ({
  children, // le contenu de ton écran (obligatoire)

  scroll = false, // true = enveloppe dans un ScrollView
  keyboard = false, // true = enveloppe dans un KeyboardAvoidingView
  centered = false, // true = centre le contenu verticalement et horizontalement
  noPaddingH = false, // true = supprime le padding horizontal (ex: carte plein écran)
  noPaddingV = false, // true = supprime le padding vertical (rare)
  bg, // couleur de fond custom (défaut: colors.bg)
  style, // styles supplémentaires si besoin
}) => {
  // On récupère les zones système (encoche, barres…)
  const insets = useSafeAreaInsets();

  // On récupère les valeurs adaptatives depuis useResponsive
  const { horizontalPadding, verticalPadding } = useResponsive();

  // La couleur de fond : celle fournie en prop ou la couleur par défaut
  const backgroundColor = bg || colors.bg;

  // ── CALCUL DES PADDINGS SÉCURISÉS ──────────────────────────────
  // On additionne les insets système + nos paddings adaptatifs.
  // Si noPaddingV est true → on garde quand même insets.top
  // pour ne jamais passer SOUS la barre de statut.
  const safePadding = {
    paddingTop: noPaddingV ? insets.top : insets.top + verticalPadding,
    paddingBottom: noPaddingV ? insets.bottom : insets.bottom + verticalPadding,
    paddingLeft: noPaddingH ? insets.left : insets.left + horizontalPadding,
    paddingRight: noPaddingH ? insets.right : insets.right + horizontalPadding,
  };

  // Si scroll=true → on utilise ScrollView pour que le contenu
  // puisse défiler si il est plus long que l'écran.
  // Si scroll=false → on utilise View (plus simple, plus performant)
  const innerContent = scroll ? (
    <ScrollView
      // style sur ScrollView = le conteneur extérieur qui prend tout l'espace
      style={{ flex: 1, backgroundColor }}
      // contentContainerStyle = le style du contenu intérieur qui peut grandir
      contentContainerStyle={[
        safePadding, // ← les paddings sécurisés
        centered && styles.centered, // ← centrage si demandé
        { flexGrow: 1 }, // ← permet le centrage vertical
        style, // ← styles custom
      ]}
      // keyboardShouldPersistTaps="handled" :
      // Permet d'appuyer sur des boutons même quand le clavier est ouvert
      // sans que l'appui ferme d'abord le clavier.
      keyboardShouldPersistTaps="handled"
      // Cache la scrollbar verticale (plus propre visuellement)
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    // Vue simple sans scroll
    <View
      style={[
        styles.flex,
        { backgroundColor },
        safePadding,
        centered && styles.centered,
        style,
      ]}
    >
      {children}
    </View>
  );

  // Si keyboard=true → on enveloppe dans KeyboardAvoidingView.
  // Ce composant remonte automatiquement le contenu quand le
  // clavier apparaît pour ne pas cacher les inputs.

  if (keyboard) {
    return (
      <KeyboardAvoidingView
        style={[styles.flex, { backgroundColor }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {innerContent}
      </KeyboardAvoidingView>
    );
  }

  // Sans clavier → juste un View de base
  return <View style={[styles.flex, { backgroundColor }]}>{innerContent}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  // flex: 1 = prend tout l'espace disponible (plein écran)
  flex: {
    flex: 1,
  },

  // Centre le contenu verticalement ET horizontalement
  // Utilisé pour les pages de login, erreurs, empty states…
  centered: {
    justifyContent: "center", // axe vertical (en colonne)
    alignItems: "center", // axe horizontal
  },
});
