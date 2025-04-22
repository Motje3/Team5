import { View, Text, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { wp, hp } from '../utils/responsive';

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

  return (
    <View style={{ flex: 1, padding: wp(6), backgroundColor: darkMode ? "#0f0D23" : "#ffffff" }}>
      <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: wp(5.5), fontWeight: 'bold', marginBottom: hp(3) }}>
        App Instellingen
      </Text>

      {/* 🔘 Dark mode */}
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
          onValueChange={setDarkMode}
          trackColor={{ false: "#767577", true: "#6D28D9" }}
          thumbColor={darkMode ? "#A970FF" : "#f4f3f4"}
        />
      </View>

      {/* 🔔 Notifications */}
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
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#767577", true: "#6D28D9" }}
          thumbColor={notificationsEnabled ? "#A970FF" : "#f4f3f4"}
        />
      </View>

      {/* 🎨 Accent kleur */}
      <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: wp(4.5), marginBottom: hp(1.5) }}>
        Accentkleur
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: hp(3) }}>
        {accentOptions.map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setAccentColor(color)}
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
