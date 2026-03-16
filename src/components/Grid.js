// Grille responsive qui adapte automatiquement le nombre de
// colonnes selon l'écran et l'orientation.
//
// USAGE :
//   <Grid
//     data={mesRecettes}
//     renderItem={(recette, largeurItem) => (
//       <RecipeCard recette={recette} width={largeurItem} />
//     )}
//   />

import React from "react";
import { FlatList, View } from "react-native";
import { useResponsive } from "../responsive/useResponsive";

const Grid = ({
  data, // le tableau de données à afficher (obligatoire)
  renderItem, // fonction qui retourne le JSX pour chaque item (obligatoire)
  // reçoit (item, itemWidth) → itemWidth calculé automatiquement

  columns: columnsProp, // override manuel du nombre de colonnes (optionnel)
  // si non fourni → useResponsive décide

  gap = 12, // espace en pixels entre les items (défaut: 12px)

  listProps = {}, // props supplémentaires à passer à FlatList
  // ex: listProps={{ ListHeaderComponent: <MonHeader /> }}
}) => {
  // On récupère les valeurs responsive
  const {
    columns: autoColumns, // colonnes calculées automatiquement
    width, // largeur totale de l'écran
    horizontalPadding, // padding latéral de l'écran
  } = useResponsive();

  // Si un nombre de colonnes est fourni en prop → on l'utilise
  // Sinon → on utilise la valeur automatique de useResponsive
  const numColumns = columnsProp || autoColumns;

  // On veut que les items occupent exactement l'espace disponible.
  //
  // Espace total disponible :
  //   largeur écran - padding gauche - padding droit
  //   = width - horizontalPadding * 2
  //
  // Espace occupé par les espaces entre colonnes :
  //   (numColumns - 1) espaces × gap pixels
  //   Ex: 3 colonnes → 2 espaces × 12px = 24px
  //
  // Largeur d'un item = espace disponible / nombre de colonnes
  //
  // Exemple avec width=390, horizontalPadding=16, numColumns=2, gap=12 :
  //   disponible = 390 - 16*2 = 358px
  //   espaces    = (2-1) * 12  = 12px
  //   itemWidth  = (358 - 12) / 2 = 173px
  const totalPadding = horizontalPadding * 2;
  const totalGap = gap * (numColumns - 1);
  const itemWidth = (width - totalPadding - totalGap) / numColumns;

  return (
    <FlatList
      data={data}
      numColumns={numColumns}
      // key={numColumns}
      //
      // Quand numColumns change (ex: rotation du téléphone),
      // React Native doit RECONSTRUIRE COMPLÈTEMENT la FlatList.
      // Sans cette prop "key", il essaie de mettre à jour en place
      // ce qui cause une erreur : "Changing numColumns on the fly…"
      //
      // En mettant key={numColumns}, quand numColumns change,
      // React voit un composant avec une nouvelle clé → il le
      // détruit et le recrée → pas d'erreur.
      key={numColumns}
      renderItem={({ item, index }) => {
        const isLastInRow = (index + 1) % numColumns === 0;

        return (
          <View
            style={{
              width: itemWidth,
              marginRight: isLastInRow ? 0 : gap, // pas de marge sur le dernier
              marginBottom: gap, // espace entre les lignes
            }}
          >
            {/* On appelle renderItem avec l'item ET sa largeur calculée.
                Le composant enfant peut utiliser cette largeur pour
                des images en aspect ratio par exemple. */}
            {renderItem(item, itemWidth)}
          </View>
        );
      }}
      // keyExtractor : donne une clé unique à chaque item pour React.
      // React utilise ces clés pour savoir quels items ont changé.
      // Si ton item a un .id → on l'utilise, sinon on utilise l'index.
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      showsVerticalScrollIndicator={false}
      // On spread les props supplémentaires à la fin
      // pour permettre la customisation (ListHeaderComponent, etc.)
      {...listProps}
    />
  );
};

export default Grid;
