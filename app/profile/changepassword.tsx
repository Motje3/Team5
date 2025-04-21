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
  import { useTheme, darkTheme, lightTheme } from '../context/ThemeContext';
  import { useApp } from '../context/AppContext';
  
  const ChangePassword = () => {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const { darkMode } = useTheme();
    const { accentColor } = useApp();
    const theme = darkMode ? darkTheme : lightTheme;
  
    const handleSave = () => {
      if (newPassword === confirmPassword) {
        // wachtwoord opslaan logic hier
        router.back();
      } else {
        alert("Wachtwoorden komen niet overeen");
      }
    };
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          backgroundColor: theme.background,
          paddingHorizontal: 24,
          justifyContent: 'center',
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
          Wachtwoord wijzigen
        </Text>
  
        <Text style={{ color: theme.secondaryText, marginBottom: 8 }}>Oud wachtwoord</Text>
        <TextInput
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Oud wachtwoord"
          placeholderTextColor={theme.secondaryText}
          secureTextEntry
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 10,
            marginBottom: 16,
          }}
        />
  
        <Text style={{ color: theme.secondaryText, marginBottom: 8 }}>Nieuw wachtwoord</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nieuw wachtwoord"
          placeholderTextColor={theme.secondaryText}
          secureTextEntry
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 10,
            marginBottom: 16,
          }}
        />
  
        <Text style={{ color: theme.secondaryText, marginBottom: 8 }}>Bevestig nieuw wachtwoord</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Herhaal nieuw wachtwoord"
          placeholderTextColor={theme.secondaryText}
          secureTextEntry
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
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Opslaan</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
  
  export default ChangePassword;
  