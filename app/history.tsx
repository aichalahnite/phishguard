// app/history.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getHistory } from "@/utils/history";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "phishguard_history";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toLocaleString();
  };

  const toggleSelect = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const deleteSelected = async () => {
    const newHistory = history.filter((_, i) => !selectedItems.includes(i));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    setHistory(newHistory);
    setSelectedItems([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan History</Text>
        {selectedItems.length > 0 ? (
          <TouchableOpacity onPress={deleteSelected} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={20} color="#fff" />
            <Text style={styles.deleteText}>Delete ({selectedItems.length})</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* List */}
      {history.length === 0 ? (
        <Text style={{ color: "#555", fontSize: 16 }}>No history available</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isSelected = selectedItems.includes(index);
            return (
              <TouchableOpacity
                onLongPress={() => toggleSelect(index)}
                onPress={() =>
                  selectedItems.length > 0 ? toggleSelect(index) : null
                }
                style={[
                  styles.card,
                  isSelected && styles.cardSelected
                ]}
              >
                {/* Status Badge */}
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: item.result === "safe" ? "#4cd964" : "#ff4d4d" }
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {item.result === "safe" ? "S" : "U"}
                  </Text>
                </View>

                {/* Info */}
                <View style={{ flex: 1 }}>
                  <Text style={styles.url} numberOfLines={1}>{item.url}</Text>
                  <Text style={styles.date}>{formatDate(item.scannedAt)}</Text>
                </View>

                {/* Extra icon */}
                {selectedItems.length > 0 ? (
                  <Ionicons
                    name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                    size={20}
                    color={isSelected ? "#007aff" : "#ccc"}
                  />
                ) : (
                  <Text style={[styles.statusText, { color: item.result === "safe" ? "#4cd964" : "#ff4d4d" }]}>
                    {item.result === "safe" ? "Safe" : "Unsafe"}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 60,
    paddingHorizontal: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  deleteBtn: {
    flexDirection: "row",
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: "center"
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#007aff"
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12
  },
  url: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500"
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 2
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold"
  }
});
