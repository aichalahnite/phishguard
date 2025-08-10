import AsyncStorage from '@react-native-async-storage/async-storage';

export type HistoryEntry = {
  url: string;
  result: 'safe' | 'unsafe';
  scannedAt: string;
};

const STORAGE_KEY = 'phishguard_history';

export async function saveToHistory(entry: HistoryEntry) {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed: HistoryEntry[] = existing ? JSON.parse(existing) : [];
    parsed.unshift(entry); // add to top
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (err) {
    console.error('Failed to save history:', err);
  }
}

export async function getHistory(): Promise<HistoryEntry[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load history:', err);
    return [];
  }
}
