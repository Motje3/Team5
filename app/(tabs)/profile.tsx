import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { useTheme, darkTheme, lightTheme } from '../context/ThemeContext';

const fallbackImage = require('../../assets/images/default-profile.png');

const Profile = () => {
  const router = useRouter();
  const { darkMode, username, email, profileImage, accentColor } = useApp();
  const theme = darkMode ? darkTheme : lightTheme;

  const handleEditProfile = () => {
    router.push("/profile/editprofile");
  };

  const handleChangePassword = () => {
    router.push("/profile/changepassword");
  };

  const handleSettings = () => {
    router.push("/profile/appsettings");
  };

  const handleLogout = () => {
    router.replace("/login/loginpage");
  };

  const options = [
    { title: "Profiel bewerken", icon: icons.edit, action: handleEditProfile },
    { title: "Wachtwoord aanpassen", icon: icons.lock, action: handleChangePassword },
    { title: "App instellingen", icon: icons.setting, action: handleSettings },
    { title: "Uitloggen", icon: icons.logout, color: "#EF4444", action: handleLogout },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Top Header */}
      <View
        style={{
          backgroundColor: accentColor,
          height: 70,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 24 }}>
          Profiel
        </Text>
      </View>

      {/* Profiel info */}
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Image
          source={profileImage ? { uri: profileImage } : fallbackImage}
          style={{ width: 90, height: 90, borderRadius: 50 }}
        />
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
          {username}
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: 14 }}>{email}</Text>
      </View>

      {/* Opties */}
      <ScrollView style={{ marginTop: 24, paddingHorizontal: 24 }}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.action}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: darkMode ? "#2D2D2D" : "#E5E7EB",
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 24,
                height: 24,
                tintColor: accentColor,
                marginRight: 12,
              }}
            />
            <Text
              style={{
                color: item.color || theme.text,
                fontSize: 16,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Profile;
