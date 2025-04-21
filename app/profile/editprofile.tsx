import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';
  import { useRouter } from 'expo-router';
  import { useApp } from '../context/AppContext';
  import * as ImagePicker from 'expo-image-picker';
  import { useTheme, darkTheme, lightTheme } from '../context/ThemeContext';
  
  const fallbackImage = require('../../assets/images/default-profile.png');
  
  const EditProfile = () => {
    const router = useRouter();
    const {
      username,
      setUsername,
      email,
      setEmail,
      profileImage,
      setProfileImage,
      accentColor,
    } = useApp();
  
    const { darkMode } = useTheme(); // ✅ haal darkMode hieruit
    const theme = darkMode ? darkTheme : lightTheme;
  
    const [newName, setNewName] = useState(username);
    const [newEmail, setNewEmail] = useState(email);
  
    const handleSave = () => {
      setUsername(newName);
      setEmail(newEmail);
      router.back();
    };
  
    const handlePickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
  
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    };
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          backgroundColor: theme.background,
          paddingHorizontal: 24,
          paddingTop: 48,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          Profiel Bewerken
        </Text>
  
        <TouchableOpacity
          onPress={handlePickImage}
          style={{ alignItems: 'center', marginBottom: 24 }}
        >
          <Image
            source={profileImage ? { uri: profileImage } : fallbackImage}
            style={{ width: 90, height: 90, borderRadius: 50 }}
          />
          <Text style={{ color: accentColor, marginTop: 8 }}>Wijzig profielfoto</Text>
        </TouchableOpacity>
  
        <Text style={{ color: theme.secondaryText, marginBottom: 8 }}>Naam</Text>
        <TextInput
          value={newName}
          onChangeText={setNewName}
          placeholder="Naam"
          placeholderTextColor={theme.secondaryText}
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 10,
            marginBottom: 16,
          }}
        />
  
        <Text style={{ color: theme.secondaryText, marginBottom: 8 }}>E-mail</Text>
        <TextInput
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="E-mail"
          placeholderTextColor={theme.secondaryText}
          keyboardType="email-address"
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 10,
            marginBottom: 32,
          }}
        />
  
        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: accentColor,
            paddingVertical: 16,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            Opslaan
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
  
  export default EditProfile;
  