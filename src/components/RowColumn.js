// Deux composants utilitaires pour composer les layouts :
//
//   Row    = conteneur horizontal (flexDirection: "row")
//   Column = conteneur vertical   (flexDirection: "column")
//
// Row peut basculer en colonne en portrait avec switchOnPortrait.
//
// USAGE :
//
//  Deux éléments côte à côte
//   <Row gap={12} align="center">
//     <Avatar />
//     <Text>Nom</Text>
//   </Row>
//
//  Côte à côte en paysage, empilés en portrait
//   <Row switchOnPortrait gap={16}>
//     <InfoCard />
//     <InfoCard />
//   </Row>
//
//   Deux colonnes égales (layout master-detail)
//   <Row>
//     <Column flex={1}><Liste /></Column>
//     <Column flex={1}><Detail /></Column>
//   </Row>

import React from "react";
import { View } from "react-native";
import { useResponsive } from "../../responsive/useResponsive";

//  ROW

export const Row = ({
  children,

  gap = 0, // espace entre les enfants
  align = "flex-start", // alignItems (axe perpendiculaire = vertical pour une Row)
  justify = "flex-start", // justifyContent (axe principal = horizontal pour une Row)
  wrap = false, // true = les enfants passent à la ligne si pas de place

  // switchOnPortrait = true :
  // En portrait  → flexDirection: "column" (empilé)
  // En paysage   → flexDirection: "row"    (côte à côte)
  switchOnPortrait = false,

  style, // styles supplémentaires
  ...props // autres props View (onLayout, testID…)
}) => {
  // On récupère isPortrait depuis useResponsive
  const { isPortrait } = useResponsive();

  // isColumn = true seulement si switchOnPortrait ET qu'on est en portrait
  const isColumn = switchOnPortrait && isPortrait;

  return (
    <View
      style={[
        {
          // Si isColumn → "column" (vertical), sinon "row" (horizontal)
          flexDirection: isColumn ? "column" : "row",
          alignItems: align,
          justifyContent: justify,
          // wrap permet aux enfants de passer à la ligne
          // "wrap" = oui, "nowrap" = non (défaut)
          flexWrap: wrap ? "wrap" : "nowrap",
          gap, // gap = espace uniforme entre tous les enfants
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

//  COLUMN

export const Column = ({
  children,

  // flex=1 → prend tout l'espace disponible
  // flex=2 avec un autre flex=1 → prend 2/3 de l'espace
  flex,

  gap = 0,
  align = "flex-start",
  justify = "flex-start",
  style,
  ...props
}) => (
  <View
    style={[
      {
        flexDirection: "column",
        alignItems: align,
        justifyContent: justify,
        gap,
        // On ajoute flex seulement s'il est fourni
        // ...(condition && objet) = ajoute l'objet seulement si condition est vraie
        ...(flex !== undefined && { flex }),
      },
      style,
    ]}
    {...props}
  >
    {children}
  </View>
);
