import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  BackHandler
} from 'react-native';
import { useRouter } from 'expo-router';
import { wp, hp } from '../utils/responsive';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const AppSettings = () => {
  const router = useRouter();
  const { user, token } = useAuth();
  const {
    darkMode,
    setDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
    accentColor,
    setAccentColor,
  } = useApp();

  // Inline theme palette
  const theme = {
    background: darkMode ? '#0f0D23' : '#ffffff',
    text: darkMode ? '#ffffff' : '#0f0D23',
    secondaryText: darkMode ? '#9CA3AF' : '#6B7280',
  };

  // Handle back navigation with animation
  const handleBack = () => {
    router.navigate("/(tabs)/profile");
    return true; // Prevents default back behavior
  };

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress', 
      handleBack
    );

    return () => backHandler.remove();
  }, []);

  const accentOptions = ['#A970FF', '#F59E0B', '#10B981', '#EF4444'];

  const updateSettings = async (newDark = darkMode, newAccent = accentColor, newNotif = notificationsEnabled) => {
    try {
      await axios.put(
        `http://192.168.1.198:5070/api/profile/${user.id}/settings`,
        {
          darkMode: newDark,
          accentColor: newAccent,
          notificationsEnabled: newNotif,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('✅ Instellingen opgeslagen in de backend');
    } catch (error) {
      console.error('❌ Fout bij opslaan instellingen:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: wp(6), backgroundColor: theme.background }}>
      <Text
        style={{
          color: theme.text,
          fontSize: wp(5.5),
          fontWeight: 'bold',
          marginBottom: hp(3),
        }}
      >
        App Instellingen
      </Text>

      {/* Donker thema */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: hp(2),
        }}
      >
        <Text style={{ color: theme.text, fontSize: wp(4.5) }}>Donker thema</Text>
        <Switch
          value={darkMode}
          onValueChange={value => {
            setDarkMode(value);
            updateSettings(value);
          }}
          trackColor={{ false: '#767577', true: '#6D28D9' }}
          thumbColor={darkMode ? '#A970FF' : '#f4f3f4'}
        />
      </View>

      {/* Meldingen */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: hp(2),
        }}
      >
        <Text style={{ color: theme.text, fontSize: wp(4.5) }}>Meldingen</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={value => {
            setNotificationsEnabled(value);
            updateSettings(darkMode, accentColor, value);
          }}
          trackColor={{ false: '#767577', true: '#6D28D9' }}
          thumbColor={notificationsEnabled ? '#A970FF' : '#f4f3f4'}
        />
      </View>

      {/* Accentkleur */}
      <Text
        style={{ color: theme.text, fontSize: wp(4.5), marginBottom: hp(1.5) }}
      >
        Accentkleur
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: hp(3) }}>
        {accentOptions.map(color => (
          <TouchableOpacity
            key={color}
            onPress={() => {
              setAccentColor(color);
              updateSettings(darkMode, color);
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

      {/* Sluiten knop */}
      <TouchableOpacity
        onPress={handleBack}
        style={{
          backgroundColor: accentColor,
          paddingVertical: hp(2),
          borderRadius: wp(3),
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: wp(4.5), fontWeight: 'bold' }}>
          Sluiten
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppSettings;