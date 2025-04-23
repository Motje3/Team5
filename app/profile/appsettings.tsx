import { View, Text, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { wp, hp } from '../utils/responsive';
import axios from 'axios';

const AppSettings = () => {
  const {
    darkMode,
    setDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
    accentColor,
    setAccentColor,
  } = useApp();
  const router = useRouter();

  const accentOptions = ['#A970FF', '#F59E0B', '#10B981', '#EF4444'];

  // ⬇️ Functie om alle instellingen te synchroniseren met backend
  const updateSettings = async (
    newDarkMode = darkMode,
    newAccent = accentColor,
    newNotif = notificationsEnabled
  ) => {
    try {
      await axios.put('http://192.168.1.114:5070/api/profile/1/settings', {
        darkMode: newDarkMode,
        accentColor: newAccent,
        notificationsEnabled: newNotif,
      });
      console.log("✅ Instellingen opgeslagen in de backend");
    } catch (error) {
      console.error("❌ Fout bij opslaan instellingen:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: wp(6), backgroundColor: darkMode ? "#0f0D23" : "#ffffff" }}>
      <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: wp(5.5), fontWeight: 'bold', marginBottom: hp(3) }}>
        App Instellingen
      </Text>

      {/* 🔘 Donker thema */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2)
      }}>
        <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: wp(4.5) }}>
          Donker thema
        </Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => {
            setDarkMode(value);
            updateSettings(value, accentColor, notificationsEnabled);
          }}
          trackColor={{ false: "#767577", true: "#6D28D9" }}
          thumbColor={darkMode ? "#A970FF" : "#f4f3f4"}
        />
      </View>

      {/* 🔔 Meldingen */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2)
      }}>
        <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: wp(4.5) }}>
          Meldingen
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => {
            setNotificationsEnabled(value);
            updateSettings(darkMode, accentColor, value);
          }}
          trackColor={{ false: "#767577", true: "#6D28D9" }}
          thumbColor={notificationsEnabled ? "#A970FF" : "#f4f3f4"}
        />
      </View>

      {/* 🎨 Accentkleur */}
      <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: wp(4.5), marginBottom: hp(1.5) }}>
        Accentkleur
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: hp(3) }}>
        {accentOptions.map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setAccentColor(color);
              updateSettings(darkMode, color, notificationsEnabled);
            }}
            style={{
              backgroundColor: color,
              width: wp(8),
              height: wp(8),
              borderRadius: wp(4),
              marginRight: wp(3),
              borderWidth: accentColor === color ? 3 : 0,
              borderColor: '#fff',
            }}
          />
        ))}
      </View>

      {/* Sluiten */}
      <TouchableOpacity
        style={{
          backgroundColor: accentColor,
          paddingVertical: hp(2),
          borderRadius: wp(3),
          alignItems: 'center',
        }}
        onPress={() => router.back()}
      >
        <Text style={{ color: "#fff", fontSize: wp(4.5), fontWeight: 'bold' }}>
          Sluiten
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppSettings;
