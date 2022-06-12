import React, { useCallback } from "react";
import { FlatList, Image, Text, View, ViewToken } from "react-native";
import { StarWarsCharacter } from './useStarWars';

interface ListViewProps {
  characters: StarWarsCharacter[]
}

export default function ListView({ characters }:ListViewProps) {

  /*
  ExceptionsManager.js:149 Invariant Violation: Changing onViewableItemsChanged on the fly is not supported
  https://localcoder.org/flatlist-scrollview-error-on-any-state-change-invariant-violation-changing-on#:~:text=The%20error%20Changing%20onViewableItemsChanged%20on,correct%20hook%20in%20this%20case.
  */

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }): void => {
      const visibleMessages = info.changed.filter(
        (entry) => entry.isViewable === true
      );

      console.log("onViewableItemsChanged", visibleMessages);

    },
    []
  );

  return (
    <FlatList
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
              height: 300,
              width: 350,
            }}
          >
            <Text>
              {item.name} {index}
            </Text>
            <Image source={{uri: item.picture}}
            style={{ width: "100%", height: "100%", resizeMode: "center" }} />
          </View>
        )
      }}
    />
  );
}