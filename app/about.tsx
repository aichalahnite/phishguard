// app/about.tsx
import React from "react";
import { View, Text, TouchableOpacity, Linking, ImageBackground, ScrollView } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")} // use your background
      style={{ flex: 1 }}
    >
      <BlurView intensity={60} tint="light" style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)", paddingHorizontal: 20, paddingTop: 60 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 20 }}>
              About PhishGuard
            </Text>

            {/* Intro section */}
            <View style={styles.card}>
              <Ionicons name="information-circle-outline" size={28} color="white" style={{ marginBottom: 10 }} />
              <Text style={styles.cardText}>
                PhishGuard is a lightweight Progressive Web App (PWA) built using Expo and React Native Web.
                It helps users detect phishing or malware URLs by integrating Google Safe Browsing Lookup API.
              </Text>
            </View>

            {/* Technologies section */}
            <View style={styles.card}>
              <Ionicons name="construct-outline" size={28} color="white" style={{ marginBottom: 10 }} />
              <Text style={styles.cardTitle}>Technologies Used:</Text>
              <Text style={styles.cardText}>• Expo + Expo Router</Text>
              <Text style={styles.cardText}>• Google Safe Browsing API</Text>
              <Text style={styles.cardText}>• AsyncStorage (history storage)</Text>
            </View>

            {/* Link */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => Linking.openURL("https://developers.google.com/safe-browsing")}
            >
              <Ionicons name="link-outline" size={28} color="#ffd369" style={{ marginBottom: 10 }} />
              <Text style={[styles.cardText, { color: "#ffd369", textDecorationLine: "underline" }]}>
                Learn more about Safe Browsing
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = {
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    color: "white",
    fontSize: 15,
    lineHeight: 22,
  },
};
