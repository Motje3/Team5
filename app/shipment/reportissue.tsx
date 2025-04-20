import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { icons } from '@/constants/icons'; // Make sure icons.reportproblem and icons.arrowleft exist

const ReportIssue = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert('Vul alle velden in.');
      return;
    }

    console.log({ title, description, image });
    Alert.alert('Probleem succesvol ingediend!');
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

      {/* 📸 Pick Image Button */}
      <TouchableOpacity
        onPress={toggleModal}
        className="bg-[#1E1B33] py-3 px-4 rounded-lg mb-4 w-full items-center border border-gray-600"
      >
        <Text className="text-white text-base">
          {image ? 'Foto wijzigen' : 'Voeg een foto toe'}
        </Text>
      </TouchableOpacity>

      {/* 🖼️ Preview Image */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: '100%',
            height: 180,
            borderRadius: 12,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />
      )}

      {/* 📤 Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-purple-600 py-3 rounded-lg items-center w-full"
      >
        <Text className="text-white text-lg font-semibold">Indienen</Text>
      </TouchableOpacity>

      {/* 🔙 Terug Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-4 flex-row items-center self-start"
      >
        <Image
          source={icons.arrowleft}
          style={{ width: 40, height: 40, marginRight: 6 }}
        />
        <Text className="text-gray-300 text-base">Terug</Text>
      </TouchableOpacity>

      {/* 📱 Modal for image choice */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={2}
        animationOutTiming={2}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
        >

        <View className="bg-[#1E1B33] p-6 rounded-t-2xl">
          <Text className="text-white text-xl font-bold mb-4 text-center">
            Foto toevoegen
          </Text>

          <TouchableOpacity
            onPress={async () => {
              toggleModal();
              const cameraPerm =
                await ImagePicker.requestCameraPermissionsAsync();
              if (!cameraPerm.granted) {
                Alert.alert('Camera toegang vereist');
                return;
              }
              const result = await ImagePicker.launchCameraAsync({
                quality: 0.5,
                allowsEditing: true,
              });
              if (!result.canceled) setImage(result.assets[0].uri);
            }}
            className="bg-purple-600 py-3 rounded-lg items-center mb-3"
          >
            <Text className="text-white text-lg">📷 Gebruik camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              toggleModal();
              const galleryPerm =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (!galleryPerm.granted) {
                Alert.alert('Galerij toegang vereist');
                return;
              }
              const result = await ImagePicker.launchImageLibraryAsync({
                quality: 0.5,
                allowsEditing: true,
              });
              if (!result.canceled) setImage(result.assets[0].uri);
            }}
            className="bg-purple-600 py-3 rounded-lg items-center"
          >
            <Text className="text-white text-lg">🖼️ Kies uit galerij</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ReportIssue;
