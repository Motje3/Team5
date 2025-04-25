import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  BackHandler,
  Keyboard
} from 'react-native';
import { wp, hp } from '../utils/responsive';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const fallbackImage = require('../../assets/images/default-profile.png');

const EditProfile = () => {
  const router = useRouter();

  const { user, token } = useAuth();

  const {
    username,
    setUsername,
    email,
    setEmail,
    profileImage,
    setProfileImage,
    accentColor,
    darkMode,
  } = useApp();

  const theme = {
    background: darkMode ? '#0f0D23' : '#ffffff',
    text: darkMode ? '#ffffff' : '#0f0D23',
    secondaryText: darkMode ? '#9CA3AF' : '#6B7280',
    card: darkMode ? '#1F2937' : '#f3f4f6',
  };

  const [newName, setNewName] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        router.navigate("/(tabs)/profile");
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const handleSave = async () => {

    Keyboard.dismiss()

    try {
      await axios.put(
        `http://192.168.1.198:5070/api/profile/${user.id}`,
        {
          fullName: newName,
          email: newEmail,
          imageUrl: profileImage || '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsername(newName);
      setEmail(newEmail);
      setProfileImage(profileImage);

      router.navigate("/(tabs)/profile");
    } catch (error) {
      console.error('❌ Fout bij opslaan profiel:', error);
    }
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
        paddingHorizontal: wp(6),
        paddingTop: hp(6),
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: wp(5.5),
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: hp(3),
        }}
      >
        Profiel Bewerken
      </Text>

      <TouchableOpacity
        onPress={handlePickImage}
        style={{ alignItems: 'center', marginBottom: hp(3) }}
      >
        <Image
          source={
            profileImage?.trim()
              ? { uri: profileImage }
              : fallbackImage
          }
          style={{
            width: wp(24),
            height: wp(24),
            borderRadius: wp(12),
          }}
        />
        <Text
          style={{
            color: accentColor,
            marginTop: hp(1),
            fontSize: wp(3.5),
          }}
        >
          Wijzig profielfoto
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: theme.secondaryText,
          marginBottom: hp(1),
          fontSize: wp(4),
        }}
      >
        Naam
      </Text>
      <TextInput
        value={newName}
        onChangeText={setNewName}
        placeholder="Naam"
        placeholderTextColor={theme.secondaryText}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          paddingHorizontal: wp(4),
          paddingVertical: hp(1.5),
          borderRadius: wp(2),
          marginBottom: hp(2),
          fontSize: wp(4),
        }}
      />

      <Text
        style={{
          color: theme.secondaryText,
          marginBottom: hp(1),
          fontSize: wp(4),
        }}
      >
        E-mail
      </Text>
      <TextInput
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder="E-mail"
        placeholderTextColor={theme.secondaryText}
        keyboardType="email-address"
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          paddingHorizontal: wp(4),
          paddingVertical: hp(1.5),
          borderRadius: wp(2),
          marginBottom: hp(4),
          fontSize: wp(4),
        }}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: accentColor,
          paddingVertical: hp(2),
          borderRadius: wp(3),
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: wp(4.5),
            fontWeight: 'bold',
          }}
        >
          Opslaan
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
