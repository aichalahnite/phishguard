// app/settings.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const handleClearHistory = async () => {
    try {
      await AsyncStorage.removeItem("phishguard_history");
      Alert.alert("History Cleared", "Scan history has been successfully cleared.");
    } catch (error) {
      Alert.alert("Error", "Failed to clear history.");
      console.error("Clear history error:", error);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")} // replace with your actual image
      style={{ flex: 1 }}
    >
      {/* Blur effect */}
      <BlurView intensity={60} tint="light" style={{ flex: 1 }}>
        {/* Dark overlay for readability */}
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)", paddingHorizontal: 20, paddingTop: 60 }}>
          
          {/* Header */}
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 30 }}>
            Settings
          </Text>

          {/* Language */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingLeft}>
              <Ionicons name="globe-outline" size={24} color="white" />
              <Text style={styles.settingText}>Language</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={{ color: "white", marginRight: 8 }}>English</Text>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color="white" />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          {/* Dark Mode */}
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={24} color="#ff6f91" />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? "#ff6f91" : "#ccc"}
            />
          </View>

          {/* Clear History */}
          <TouchableOpacity style={styles.settingItem} onPress={handleClearHistory}>
            <View style={styles.settingLeft}>
              <Ionicons name="trash-outline" size={24} color="#ff4d4d" />
              <Text style={styles.settingText}>Clear Scan History</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          {/* Help */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={24} color="white" />
              <Text style={styles.settingText}>Help</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = {
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    color: "white",
    fontSize: 16,
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
};
