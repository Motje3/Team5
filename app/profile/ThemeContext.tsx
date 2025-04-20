import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext<any>(null);

const ThemeProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState('#A970FF');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const dark = await AsyncStorage.getItem('setting_darkMode');
      const color = await AsyncStorage.getItem('setting_accentColor');
      const notif = await AsyncStorage.getItem('setting_notifications');

      if (dark !== null) setIsDarkMode(dark === 'true');
      if (color) setAccentColor(color);
      if (notif !== null) setNotificationsEnabled(notif === 'true');
    };

    loadSettings();
  }, []);

  const updateDarkMode = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem('setting_darkMode', value.toString());
  };

  const updateAccentColor = async (color: string) => {
    setAccentColor(color);
    await AsyncStorage.setItem('setting_accentColor', color);
  };

  const updateNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    await AsyncStorage.setItem('setting_notifications', value.toString());
  };

  const resetAll = async () => {
    await AsyncStorage.multiRemove([
      'setting_darkMode',
      'setting_accentColor',
      'setting_notifications',
    ]);
    setIsDarkMode(false);
    setAccentColor('#A970FF');
    setNotificationsEnabled(true);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        accentColor,
        notificationsEnabled,
        updateDarkMode,
        updateAccentColor,
        updateNotifications,
        resetAll,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
export default ThemeContext;
