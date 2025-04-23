import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';

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
  const router = useRouter();

  const [username, setUsername] = useState("Laden...");
  const [email, setEmail] = useState("...");
  const [accentColorState, setAccentColorState] = useState(defaultAccent);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [darkModeState, setDarkModeState] = useState<boolean | null>(null);
  const [notificationsEnabledState, setNotificationsEnabledState] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 🔁 Load session & fetch user data
  useEffect(() => {
    const loadSessionAndProfile = async () => {
      const sessionData = await AsyncStorage.getItem("userSession");

      if (!sessionData) {
        router.replace("/login/loginpage");
        return;
      }

      const session = JSON.parse(sessionData);
      const isExpired = Date.now() > session.expiresAt;

      if (isExpired) {
        await AsyncStorage.removeItem("userSession");
        router.replace("/login/loginpage");
        return;
      }

      setToken(session.token);
      setUserId(session.user.id);

      try {
        const response = await axios.get(`http://192.168.1.198:5070/api/profile/${session.user.id}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        });

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

    loadSessionAndProfile();
  }, []);

  // ✅ Save + update settings on backend
  const updateSettingsOnBackend = async (
    accentColor: string,
    darkMode: boolean,
    notificationsEnabled: boolean
  ) => {
    if (!userId || !token) return;

    try {
      await axios.put(`http://192.168.1.198:5070/api/profile/${userId}/settings`, {
        accentColor,
        darkMode,
        notificationsEnabled,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Instellingen opgeslagen in backend");
    } catch (err) {
      console.error("❌ Fout bij opslaan instellingen:", err);
    }
  };

  const setDarkMode = async (value: boolean) => {
    await AsyncStorage.setItem('darkMode', value.toString());
    setDarkModeState(value);
    updateSettingsOnBackend(accentColorState, value, notificationsEnabledState);
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
    updateSettingsOnBackend(color, darkModeState!, notificationsEnabledState);
  };

  const setNotificationsEnabled = (enabled: boolean) => {
    setNotificationsEnabledState(enabled);
    updateSettingsOnBackend(accentColorState, darkModeState!, enabled);
  };

  if (darkModeState === null) return null;

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
