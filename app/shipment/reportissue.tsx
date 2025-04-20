import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const ReportIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert("Vul alle velden in.");
      return;
    }
    // Save logic here (e.g., send to backend)
    Alert.alert("Probleem succesvol ingediend!");
  };

  return (
    <View className="flex-1 bg-primary px-6 py-10">
      <Text className="text-white text-2xl font-bold mb-4">Probleem melden</Text>

      <Text className="text-white mb-2">Titel</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Bijv. QR-code werkt niet"
        placeholderTextColor="#A8A8A8"
        className="bg-[#1E1B33] text-white px-4 py-3 rounded-lg mb-4"
      />

      <Text className="text-white mb-2">Omschrijving</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Beschrijf het probleem"
        placeholderTextColor="#A8A8A8"
        multiline
        numberOfLines={5}
        className="bg-[#1E1B33] text-white px-4 py-3 rounded-lg mb-6 text-left"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-purple-600 py-3 rounded-lg items-center"
      >
        <Text className="text-white text-lg font-semibold">Indienen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportIssue;
