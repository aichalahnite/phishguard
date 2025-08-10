// app/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { checkUrlSafety } from '@/utils/safeBrowsing';
import { saveToHistory } from '@/utils/history';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setStatus('Checking...');

    try {
      const result = await checkUrlSafety(url);
      setStatus(`URL is: ${result.toUpperCase()}`);

      await saveToHistory({
        url,
        result,
        scannedAt: new Date().toISOString(),
      });

      Toast.show({
        type: result === 'safe' ? 'success' : 'error',
        text1: `URL is ${result.toUpperCase()}`,
        text2: result === 'safe' ? 'No threats detected.' : 'Threat detected!',
      });

      setUrl('');
    } catch (error) {
      console.error('Error checking URL:', error);
      setStatus('Error checking URL');
      Toast.show({
        type: 'error',
        text1: 'Scan Failed',
        text2: 'Could not check the URL.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark-outline" size={36} color="#fff" />
        <Text style={styles.headerText}>PhishGuard</Text>
      </View>

      {/* Input */}
      <View style={styles.card}>
        <Text style={styles.label}>Enter a URL</Text>
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com"
          autoCapitalize="none"
          keyboardType={Platform.OS === 'web' ? 'url' : 'default'}
        />

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleCheck} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Check URL</Text>
          )}
        </TouchableOpacity>

        {/* Status */}
        {!loading && <Text style={styles.status}>{status}</Text>}
      </View>

      {/* Link to History */}
      <Link href="/history" asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Ionicons name="time-outline" size={18} color="#6b6b6b" />
          <Text style={styles.linkText}>View History</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6c63ff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  linkText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#6b6b6b',
  },
});
