import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importeer AsyncStorage

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
  const [username, setUsername] = useState("Tyrone");
  const [email, setEmail] = useState("tyronewood@gmail.com");
  const [accentColor, setAccentColor] = useState(defaultAccent);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [darkMode, setDarkModeState] = useState<boolean | null>(null); // Laat het initieel null zijn totdat we de waarde hebben opgehaald
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const loadThemePreference = async () => {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      // Als er geen waarde opgeslagen is, zet deze dan standaard op true (dark mode aan)
      setDarkModeState(savedDarkMode === 'true' ? true : true);
    };
    
    loadThemePreference();
  }, []);

  const setDarkMode = async (value: boolean) => {
    await AsyncStorage.setItem('darkMode', value.toString()); // Sla de keuze op in AsyncStorage
    setDarkModeState(value);
  };

  if (darkMode === null) {
    return null; // Wacht totdat we de voorkeur hebben geladen
  }

  return (
    <AppContext.Provider
      value={{
        username, setUsername,
        email, setEmail,
        accentColor, setAccentColor,
        profileImage, setProfileImage,
        darkMode, setDarkMode,
        notificationsEnabled, setNotificationsEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
