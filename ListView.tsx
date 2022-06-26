import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import React, { useCallback, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View, ViewToken } from "react-native";
import { StarWarsCharacter } from './useStarWars';

interface ListViewProps {
  characters: StarWarsCharacter[],
  alreadyTracked: StarWarsCharacter[]
}

type SeenItem = {
  [key: string]: StarWarsCharacter
}

export default function ListView({ characters, alreadyTracked }:ListViewProps) {

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });


  const [, setAlreadySeen] = useState<SeenItem[]>(
    // initialize state
    () => {
    return alreadyTracked.map(item => {
      return {[item.name]: item};
    })
  });

  /*
  ExceptionsManager.js:149 Invariant Violation: Changing onViewableItemsChanged on the fly is not supported
  https://localcoder.org/flatlist-scrollview-error-on-any-state-change-invariant-violation-changing-on#:~:text=The%20error%20Changing%20onViewableItemsChanged%20on,correct%20hook%20in%20this%20case.
  */

  const trackItem = (item:StarWarsCharacter) => console.log("### track " + item.name)

  /*
    TODO Problematik herausarbeiten in Schritten
    1. Invariant Violation erzeugen -> useCallback mit empty deps -> track von jedem seen event ✅
    2. Variante mit deps -> invariant violation wieder erzeugt ❌
    3. Erklären dass useCallback keine deps haben darf -> Konzept erklären mit useState callbacks kann state/useEffect Kombination und somit dep in useCallback vermieden werden
    4. Finale Lösung erarbeiten
  */
  const onViewableItemsChanged = useCallback(
    (info: { changed: ViewToken[] }): void => {
      const visibleItems = info.changed.filter(
        (entry) => entry.isViewable
      );
      setAlreadySeen((prevState:SeenItem[]) => {
        // perform side effect
        visibleItems.forEach(visible => {
          const exists = prevState.find(prev => visible.item.name in prev);
          if (!exists) trackItem(visible.item);  
        });
        // calculate new state
        return [
          ...prevState,
          ...visibleItems.map(visible => ({
            [visible.item.name]: visible.item
          }))
        ]
      })
    },
    []
  );

  /**
   * 1. In nachgelagertem Kapitel viewabilityConfig erklären
   * 2. Mehrere configs für verschiedene Use Cases zeigen -> weiterer Effect: visible items visuell hervorheben (Rahmen etc.)
   * 3. Schauen was man von dem technischen Artikel erwähnenswert ist.
   */
  return (
    <FlatList
      style={styles.container}
      data={characters}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
        minimumViewTime: 2000,
      }}
      renderItem={({ item, index }) => {

        return (
          <View
            key={item.name}
            style={{
              height: 200,
              width: Dimensions.get("window").width
            }}
          >
            <View style={{flexDirection: "row", alignItems: "center", padding: 20, backgroundColor: index % 2 === 0 ? "rgb(211,191,129)" : "rgb(162, 162, 70)"}}>
              <View style={{width: Dimensions.get("window").width * 0.33}}>
                <Image source={{uri: item.picture}} style={{ width: "100%", height: "100%", resizeMode: "center" }} />
              </View>
              <View style={{ paddingLeft: 10, flex: 1}}>
                <Text style={{ fontFamily: 'Inter_900Black', fontSize: 20 }}>
                  {item.name}
                </Text>
              </View>
            </View>
          </View>
        )
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
  },
});