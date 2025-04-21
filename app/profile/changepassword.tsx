import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const ChangePassword = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // hier komt straks backend logica
    if (newPassword === confirmPassword) {
      // wachtwoord opslaan
      router.back(); // terug naar profielpagina
    } else {
      alert("Wachtwoorden komen niet overeen");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-primary px-6 justify-center"
    >
      <Text className="text-white text-2xl font-bold mb-6 text-center">Wachtwoord wijzigen</Text>

      <Text className="text-gray-400 mb-2">Oud wachtwoord</Text>
      <TextInput
        value={oldPassword}
        onChangeText={setOldPassword}
        placeholder="Oud wachtwoord"
        placeholderTextColor="#999"
        secureTextEntry
        className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-4"
      />

      <Text className="text-gray-400 mb-2">Nieuw wachtwoord</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Nieuw wachtwoord"
        placeholderTextColor="#999"
        secureTextEntry
        className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-4"
      />

      <Text className="text-gray-400 mb-2">Bevestig nieuw wachtwoord</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Herhaal nieuw wachtwoord"
        placeholderTextColor="#999"
        secureTextEntry
        className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-6"
      />

      <TouchableOpacity
        onPress={handleSave}
        className="bg-purple-600 py-4 rounded-lg items-center"
      >
        <Text className="text-white text-lg font-semibold">Opslaan</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
