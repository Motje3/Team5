import { View, Text, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';  // Importeren van useRouter voor navigatie
import { useApp } from '../context/AppContext';

const AppSettings = () => {
  const {
    darkMode,
    setDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
    accentColor,
    setAccentColor,
  } = useApp(); // Gebruik van useApp om darkMode op te halen en bij te werken
  const router = useRouter();  // Initialiseren van router

  const accentOptions = ['#A970FF', '#F59E0B', '#10B981', '#EF4444'];

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: darkMode ? "#0f0D23" : "#ffffff" }}>
      <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 22, fontWeight: 'bold', marginBottom: 24 }}>
        App Instellingen
      </Text>

      {/* 🔘 Dark mode */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 18 }}>Donker thema</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode} // Wijzig de waarde van darkMode
          trackColor={{ false: "#767577", true: "#6D28D9" }}
          thumbColor={darkMode ? "#A970FF" : "#f4f3f4"}
        />
      </View>

      {/* 🔔 Notifications */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 18 }}>Meldingen</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#767577", true: "#6D28D9" }}
          thumbColor={notificationsEnabled ? "#A970FF" : "#f4f3f4"}
        />
      </View>

      {/* 🎨 Accent kleur */}
      <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 18, marginBottom: 10 }}>Accentkleur</Text>
      <View style={{ flexDirection: 'row', marginBottom: 30 }}>
        {accentOptions.map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setAccentColor(color)} // Wijzig de accentkleur
            style={{
              backgroundColor: color,
              width: 32,
              height: 32,
              borderRadius: 16,
              marginRight: 12,
              borderWidth: accentColor === color ? 3 : 0, // Highlight de geselecteerde kleur
              borderColor: '#fff',
            }}
          />
        ))}
      </View>

      {/* Sluiten */}
      <TouchableOpacity
        style={{
          backgroundColor: accentColor, // Zorg ervoor dat de kleur van de knop verandert
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
        }}
        onPress={() => router.back()}  // Vervang history.back() door router.back()
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }}>Sluiten</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppSettings;
