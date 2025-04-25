import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  BackHandler
} from 'react-native';
import { wp, hp } from '../utils/responsive';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ChangePassword = () => {
  const router = useRouter();
  const { user, token } = useAuth();
  const { darkMode } = useApp();

  // Inline theme palette
  const theme = {
    background: darkMode ? '#0f0D23' : '#ffffff',
    card: darkMode ? '#1F2937' : '#f3f4f6',
    text: darkMode ? '#ffffff' : '#0f0D23',
    secondaryText: darkMode ? '#9CA3AF' : '#6B7280',
  };

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBack = () => {
    router.navigate("/(tabs)/profile");
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack
    );
    return () => backHandler.remove();
  }, []);

  const handleSave = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // Validate new password length
    if (newPassword.length < 6) {
      setErrorMessage('❌ Nieuw wachtwoord moet minimaal 6 tekens zijn');
      return;
    }

    // Validate confirmation match
    if (newPassword !== confirmPassword) {
      setErrorMessage('❌ Wachtwoorden komen niet overeen');
      return;
    }

    try {
      await axios.post(
        `http://192.168.1.198:5070/api/profile/${user.id}/change-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage('✅ Wachtwoord succesvol gewijzigd');
      setTimeout(() => router.navigate("/(tabs)/profile"), 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setErrorMessage('❌ Oud wachtwoord klopt niet');
        } else {
          setErrorMessage(
            `❌ ${error.response?.data?.message || 'Serverfout: probeer het later opnieuw'}`
          );
        }
      } else {
        setErrorMessage('❌ Onbekende fout, probeer het later opnieuw');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: wp(6),
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: wp(6),
          fontWeight: 'bold',
          marginBottom: hp(4),
          textAlign: 'center',
        }}
      >
        Wachtwoord wijzigen
      </Text>

      <Text style={{ color: theme.secondaryText, fontSize: wp(4), marginBottom: hp(1) }}>
        Oud wachtwoord
      </Text>
      <TextInput
        value={oldPassword}
        onChangeText={setOldPassword}
        placeholder="Oud wachtwoord"
        placeholderTextColor={theme.secondaryText}
        secureTextEntry
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

      <Text style={{ color: theme.secondaryText, fontSize: wp(4), marginBottom: hp(1) }}>
        Nieuw wachtwoord
      </Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Nieuw wachtwoord"
        placeholderTextColor={theme.secondaryText}
        secureTextEntry
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

      <Text style={{ color: theme.secondaryText, fontSize: wp(4), marginBottom: hp(1) }}>
        Bevestig nieuw wachtwoord
      </Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Herhaal nieuw wachtwoord"
        placeholderTextColor={theme.secondaryText}
        secureTextEntry
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          paddingHorizontal: wp(4),
          paddingVertical: hp(1.5),
          borderRadius: wp(2),
          marginBottom: hp(3),
          fontSize: wp(4),
        }}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: '#7C3AED',
          paddingVertical: hp(2),
          borderRadius: wp(2.5),
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: wp(4.5), fontWeight: '600' }}>
          Opslaan
        </Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={{ color: '#EF4444', marginTop: hp(1.5), fontSize: wp(3.8), textAlign: 'center' }}>
          {errorMessage}
        </Text>
      ) : null}

      {successMessage ? (
        <Text style={{ color: '#10B981', marginTop: hp(1.5), fontSize: wp(3.8), textAlign: 'center' }}>
          {successMessage}
        </Text>
      ) : null}

    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
