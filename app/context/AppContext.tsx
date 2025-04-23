import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type AppContextType = {
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  accentColor: string;
  setAccentColor: (value: string) => void;
  profileImage: string | null;
  setProfileImage: (value: string | null) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
};

const defaultAccent = '#A970FF';

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("Laden...");
  const [email, setEmail] = useState("...");
  const [accentColorState, setAccentColorState] = useState(defaultAccent);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [darkModeState, setDarkModeState] = useState<boolean | null>(null);
  const [notificationsEnabledState, setNotificationsEnabledState] = useState(true);

  // 🔁 Backend update functie
  const updateSettingsOnBackend = async (
    accentColor: string,
    darkMode: boolean,
    notificationsEnabled: boolean
  ) => {
    try {
      await axios.put("http://192.168.1.114:5070/api/profile/1/settings", {
        accentColor,
        darkMode,
        notificationsEnabled
      });
      console.log("✅ Instellingen opgeslagen in backend");
    } catch (err) {
      console.error("❌ Fout bij opslaan instellingen:", err);
    }
  };

  // 🔁 Bij start profiel en voorkeuren ophalen
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await axios.get("http://192.168.1.114:5070/api/profile/1");
        const data = response.data;
        setUsername(data.fullName);
        setEmail(data.email);
        setProfileImage(data.imageUrl);
        setAccentColorState(data.accentColor || defaultAccent);
        setDarkModeState(data.darkMode ?? true);
        setNotificationsEnabledState(data.notificationsEnabled ?? true);
        console.log("🔄 Profiel geladen uit backend:", data);
      } catch (error) {
        console.error("❌ Fout bij laden profiel uit backend:", error);
      }
    };

    const loadThemePreference = async () => {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setDarkModeState(savedDarkMode === 'true');
      }
    };

    loadThemePreference();
    loadProfile();
  }, []);

  // 📌 Donker thema instellen + opslaan
  const setDarkMode = async (value: boolean) => {
    await AsyncStorage.setItem('darkMode', value.toString());
    setDarkModeState(value);
    updateSettingsOnBackend(accentColorState, value, notificationsEnabledState);
  };

  // 📌 Accentkleur instellen + opslaan
  const setAccentColor = (color: string) => {
    setAccentColorState(color);
    updateSettingsOnBackend(color, darkModeState!, notificationsEnabledState);
  };

  // 📌 Notificaties instellen + opslaan
  const setNotificationsEnabled = (enabled: boolean) => {
    setNotificationsEnabledState(enabled);
    updateSettingsOnBackend(accentColorState, darkModeState!, enabled);
  };

  if (darkModeState === null) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        username, setUsername,
        email, setEmail,
        accentColor: accentColorState, setAccentColor,
        profileImage, setProfileImage,
        darkMode: darkModeState, setDarkMode,
        notificationsEnabled: notificationsEnabledState, setNotificationsEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
