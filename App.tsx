import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ListView from "./ListView";
import {StarWarsCharacter, useStarWars} from './useStarWars'

/**
 * List of Star Wars characters https://morioh.com/p/e125b83b5d8d
 * 
 * - toggle to switch dark mode -> rerender ListView 
 * - custom hook for fetching and state management
 * - 2 configs unterschiedliche Schwellwerte: 1. in viewport dann text nebend dran einblenden oder Foto etwas vergrößern
 * 2. tracking Logik
 * - Verschiedenen Phasen der Entwicklung im Artikel beschreiben
 */

export default function App() {
  const starWarsPeople: StarWarsCharacter[] = useStarWars() || [];

  return (
    <View style={styles.container}>
      <ListView characters={starWarsPeople} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

