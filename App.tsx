import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import ListView from "./ListView";
import { StarWarsCharacter, useStarWars } from "./useStarWars";

/**
 * List of Star Wars characters https://morioh.com/p/e125b83b5d8d
 *
 * TODOs
 * - eslint plugin
 * - 2 configs unterschiedliche Schwellwerte: 1. in viewport dann text nebend dran einblenden oder Foto etwas vergrößern
 */

function getAlreadyTracked() {
  // return [{
  //   name: "Luke Skywalker",
  //   picture: ""
  // }]
  return [];
}

export default function App() {
  const starWarsPeople: StarWarsCharacter[] = useStarWars() || [];

  return (
    <SafeAreaView style={styles.container}>
      <ListView
        characters={starWarsPeople}
        alreadyTracked={getAlreadyTracked()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#28a745",
    alignItems: "center",
    justifyContent: "center",
  },
});
