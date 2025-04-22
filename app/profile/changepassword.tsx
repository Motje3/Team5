import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { wp, hp } from '../utils/responsive';

const ChangePassword = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      router.back();
    } else {
      alert("Wachtwoorden komen niet overeen");
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
