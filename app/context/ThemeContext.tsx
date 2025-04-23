import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { wp, hp } from '../utils/responsive'; // als je in 'app/tabs/' zit


type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Light theme object
export const lightTheme = {
  background: "#ffffff",
  text: "#0f0D23",
  secondaryText: "#6B7280",
  card: "#f3f4f6",
};

// Dark theme object
export const darkTheme = {
  background: "#0f0D23",
  text: "#ffffff",
  secondaryText: "#9CA3AF",
  card: "#1F2937",
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // We initialize darkMode to null so we can check the saved value in AsyncStorage
  const [darkMode, setDarkModeState] = useState<boolean | null>(null);

  useEffect(() => {
    const loadThemePreference = async () => {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      // If there's no saved preference, default to true (dark mode)
      setDarkModeState(savedDarkMode === 'true' ? true : true);
    };

    loadThemePreference();
  }, []);

  // Save the dark mode preference in AsyncStorage
  const setDarkMode = async (value: boolean) => {
    await AsyncStorage.setItem('darkMode', value.toString());
    setDarkModeState(value);
  };

  if (darkMode === null) {
    return null; // Wait until we have loaded the theme preference
  }

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
