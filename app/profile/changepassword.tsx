import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { wp, hp } from '../utils/responsive';
import axios from 'axios';

const ChangePassword = () => {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage("Wachtwoorden komen niet overeen");
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.114:5070/api/profile/1/change-password', {
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("✅ Wachtwoord succesvol gewijzigd");
        setTimeout(() => router.back(), 1500);
      } else {
        setErrorMessage("Er ging iets mis bij het opslaan");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage("❌ Oud wachtwoord klopt niet");
      } else {
        setErrorMessage("❌ Serverfout: probeer het later opnieuw");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: '#1E1B33',
        paddingHorizontal: wp(6),
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: wp(6),
          fontWeight: 'bold',
          marginBottom: hp(4),
          textAlign: 'center',
        }}
      >
        Wachtwoord wijzigen
      </Text>

      {/* Oud wachtwoord */}
      <Text style={{ color: "#9CA3AF", fontSize: wp(4), marginBottom: hp(1) }}>
        Oud wachtwoord
      </Text>
      <TextInput
        value={oldPassword}
        onChangeText={setOldPassword}
        placeholder="Oud wachtwoord"
        placeholderTextColor="#999"
        secureTextEntry
        style={{
          backgroundColor: '#2D2D2D',
          color: '#fff',
          paddingHorizontal: wp(4),
          paddingVertical: hp(1.5),
          borderRadius: wp(2),
          marginBottom: hp(2),
          fontSize: wp(4),
        }}
      />

      {/* Nieuw wachtwoord */}
      <Text style={{ color: "#9CA3AF", fontSize: wp(4), marginBottom: hp(1) }}>
        Nieuw wachtwoord
      </Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Nieuw wachtwoord"
        placeholderTextColor="#999"
        secureTextEntry
        style={{
          backgroundColor: '#2D2D2D',
          color: '#fff',
          paddingHorizontal: wp(4),
          paddingVertical: hp(1.5),
          borderRadius: wp(2),
          marginBottom: hp(2),
          fontSize: wp(4),
        }}
      />

      {/* Bevestig nieuw wachtwoord */}
      <Text style={{ color: "#9CA3AF", fontSize: wp(4), marginBottom: hp(1) }}>
        Bevestig nieuw wachtwoord
      </Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Herhaal nieuw wachtwoord"
        placeholderTextColor="#999"
        secureTextEntry
        style={{
          backgroundColor: '#2D2D2D',
          color: '#fff',
          paddingHorizontal: wp(4),
          paddingVertical: hp(1.5),
          borderRadius: wp(2),
          marginBottom: hp(3),
          fontSize: wp(4),
        }}
      />

      {/* Feedback */}
      {errorMessage ? (
        <Text style={{ color: "#EF4444", marginBottom: hp(1.5), fontSize: wp(3.8), textAlign: 'center' }}>
          {errorMessage}
        </Text>
      ) : null}

      {successMessage ? (
        <Text style={{ color: "#10B981", marginBottom: hp(1.5), fontSize: wp(3.8), textAlign: 'center' }}>
          {successMessage}
        </Text>
      ) : null}

      {/* Opslaan knop */}
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
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
