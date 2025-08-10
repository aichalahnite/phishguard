// components/LogoHeader.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function LogoHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")} // your logo path
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 100,
  },
  logo: {
    width: 80,   // big size
    height: 80,
  },
});
