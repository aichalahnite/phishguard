import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        if (options.href === null) return null; // hide tab

        const label =
          options.tabBarLabel ??
          options.title ??
          route.name;

        const iconName = options.tabBarIcon || "ellipse-outline";
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.tabActive]}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#6C63FF" : "#999"}
            />
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: "#f0f0ff",
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  labelActive: {
    color: "#6C63FF",
    fontWeight: "bold",
  },
});
