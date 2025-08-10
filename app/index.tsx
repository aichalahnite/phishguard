// app/welcome.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter, Stack } from "expo-router";
import { BlurView } from "expo-blur";
import Ionicons from "react-native-vector-icons/Ionicons"; // arrow icon

export default function Welcome() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false, tabBarStyle: { display: "none" } }} />

      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Blur the background */}
        <BlurView intensity={50} style={styles.blurOverlay} tint="light" />

        {/* Decorative circles ABOVE the blur */}
        <View style={[styles.circle, { top: 80, left: 50, backgroundColor: "#f8b6d2" }]} />
        <View style={[styles.circle, { top: 200, right: 30, backgroundColor: "#f8b6d2" }]} />
        <View style={[styles.circle, { bottom: 150, left: 20, backgroundColor: "#f8b6d2" }]} />

        {/* Main content */}
        <View style={styles.contentContainer}>
          {/* Logo */}
          <Image
            source={require("@/assets/images/logo_white.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>PhishGuard</Text>
          <Text style={styles.subtitle}>Secure Your Inbox. Instantly.</Text>

          {/* Bottom-right SCAN Button */}
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.scanText}>SCAN</Text>
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    letterSpacing: 1,
    color: "#fff",
    textAlign: "center",
  },
  scanButton: {
    position: "absolute",
    bottom: 40,
    right: 30,
    alignItems: "center",
  },
  scanText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
    letterSpacing: 1,
  },
  arrowCircle: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  circle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.8,
    zIndex: 2, // make sure circles are above blur
  },
});
