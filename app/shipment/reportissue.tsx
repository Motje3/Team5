import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { icons } from '@/constants/icons'; // Add your reportproblem icon here

const ReportIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert("Vul alle velden in.");
      return;
    }
    Alert.alert("Probleem succesvol ingediend!");
  };

  return (
    <View className="flex-1 bg-primary px-6 py-10 justify-center items-center">
      {/* 🧠 Big Center Icon */}
      <Image 
        source={icons.reportproblem} 
        style={{ width: 140, height: 140, marginBottom: 20 }}
      />

      {/* 🧾 Header Title */}
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Probleem melden
      </Text>

      {/* ✏️ Titel Input */}
      <Text className="text-white mb-2 self-start">Titel</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Bijv. QR-code werkt niet"
        placeholderTextColor="#A8A8A8"
        className="bg-[#1E1B33] text-white px-4 py-3 rounded-lg mb-4 w-full"
      />

      {/* 📝 Omschrijving Input */}
      <Text className="text-white mb-2 self-start">Omschrijving</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Beschrijf het probleem"
        placeholderTextColor="#A8A8A8"
        multiline
        numberOfLines={5}
        className="bg-[#1E1B33] text-white px-4 py-3 rounded-lg mb-6 w-full text-left"
      />

      {/* 📤 Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-purple-600 py-3 rounded-lg items-center w-full"
      >
        <Text className="text-white text-lg font-semibold">Indienen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportIssue;
