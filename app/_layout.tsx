// app/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Animated } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#A29BFE",
          height: 80,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: "absolute",
          marginHorizontal: 20, // Creates space for floating effect
          marginBottom: 15, // Lift above bottom
          paddingBottom: 0,
          // Shadow (iOS)
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          // Shadow (Android)
          elevation: 6,
        },
        tabBarItemStyle: {
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
        },
        tabBarActiveTintColor: "#A29BFE",
        tabBarInactiveTintColor: "#E5E4F0",
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      {renderTab("home", "scan")}
      {renderTab("history", "time-outline")}
      {renderTab("about", "information-circle-outline")}
      {renderTab("settings", "settings-outline")}

      <Tabs.Screen name="_app" options={{ href: null }} />
    </Tabs>
  );
}

// Custom tab renderer with animation
function renderTab(name: string, icon: keyof typeof Ionicons.glyphMap) {
  return (
    <Tabs.Screen
      key={name}
      name={name}
      options={{
        tabBarIcon: ({ focused, color }) => {
          const scaleAnim = React.useRef(new Animated.Value(focused ? 1 : 0.8))
            .current;
          const bgAnim = React.useRef(new Animated.Value(focused ? 1 : 0))
            .current;

          React.useEffect(() => {
            Animated.spring(scaleAnim, {
              toValue: focused ? 1 : 0.9,
              useNativeDriver: true,
            }).start();

            Animated.timing(bgAnim, {
              toValue: focused ? 1 : 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }, [focused]);

          return (
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                backgroundColor: bgAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["transparent", "#ffffff"],
                }),
                padding: 12,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={icon} size={32} color={focused ? "#A29BFE" : color} />
            </Animated.View>
          );
        },
      }}
    />
  );
}
