import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { wp, hp } from '../utils/responsive';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { icons } from '@/constants/icons';

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#1E1B33',
          paddingHorizontal: wp(6),
          paddingTop: hp(6),
          paddingBottom: hp(6),
          alignItems: 'center',
        }}
      >
        {/* 🧠 Big Center Icon */}
        <Image
          source={icons.reportproblem}
          style={{ width: wp(35), height: wp(35), marginBottom: hp(3) }}
        />

        {/* 🧾 Header Title */}
        <Text
          style={{
            color: '#fff',
            fontSize: wp(6.5),
            fontWeight: 'bold',
            marginBottom: hp(5),
            textAlign: 'center',
          }}
        >
          Probleem melden
        </Text>

        {/* ✏️ Titel Input */}
        <Text
          style={{
            color: '#fff',
            fontSize: wp(4),
            alignSelf: 'flex-start',
            marginBottom: hp(1),
          }}
        >
          Titel
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Bijv. QR-code werkt niet"
          placeholderTextColor="#A8A8A8"
          style={{
            backgroundColor: '#2C2C3E',
            color: '#fff',
            borderRadius: wp(2),
            paddingHorizontal: wp(4),
            paddingVertical: hp(1.5),
            marginBottom: hp(2),
            width: '100%',
            fontSize: wp(4),
          }}
        />

        {/* 📝 Omschrijving Input */}
        <Text
          style={{
            color: '#fff',
            fontSize: wp(4),
            alignSelf: 'flex-start',
            marginBottom: hp(1),
          }}
        >
          Omschrijving
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Beschrijf het probleem"
          placeholderTextColor="#A8A8A8"
          multiline
          numberOfLines={5}
          style={{
            backgroundColor: '#2C2C3E',
            color: '#fff',
            borderRadius: wp(2),
            paddingHorizontal: wp(4),
            paddingVertical: hp(2),
            marginBottom: hp(2.5),
            width: '100%',
            fontSize: wp(4),
            textAlignVertical: 'top',
          }}
        />

        {/* 📸 Pick Image Button */}
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            backgroundColor: '#2C2C3E',
            paddingVertical: hp(1.5),
            paddingHorizontal: wp(4),
            borderRadius: wp(2),
            marginBottom: hp(2),
            borderWidth: 1,
            borderColor: '#555',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: wp(4) }}>
            {image ? '📷 Foto wijzigen' : '📷 Voeg een foto toe'}
          </Text>
        </TouchableOpacity>

        {/* 🖼️ Preview Image */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: hp(22),
              borderRadius: wp(3),
              marginBottom: hp(2),
            }}
            resizeMode="cover"
          />
        )}

        {/* 📤 Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: '#7C3AED',
            paddingVertical: hp(2),
            borderRadius: wp(2.5),
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text style={{ color: '#fff', fontSize: wp(4.5), fontWeight: 'bold' }}>
            Indienen
          </Text>
        </TouchableOpacity>

        {/* 🔙 Terug Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: hp(3),
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}
        >
          <Image
            source={icons.arrowleft}
            style={{ width: wp(7), height: wp(7), marginRight: wp(2) }}
          />
          <Text style={{ color: '#D1D5DB', fontSize: wp(4) }}>Terug</Text>
        </TouchableOpacity>

        {/* 📱 Modal */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <View
            style={{
              backgroundColor: '#1E1B33',
              padding: wp(6),
              borderTopLeftRadius: wp(6),
              borderTopRightRadius: wp(6),
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: wp(5),
                fontWeight: 'bold',
                marginBottom: hp(2),
                textAlign: 'center',
              }}
            >
              Foto toevoegen
            </Text>

            <TouchableOpacity
              onPress={async () => {
                toggleModal();
                const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
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
              style={{
                backgroundColor: '#7C3AED',
                paddingVertical: hp(2),
                borderRadius: wp(2),
                alignItems: 'center',
                marginBottom: hp(1.5),
              }}
            >
              <Text style={{ color: '#fff', fontSize: wp(4.5) }}>
                📷 Gebruik camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                toggleModal();
                const galleryPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
              style={{
                backgroundColor: '#7C3AED',
                paddingVertical: hp(2),
                borderRadius: wp(2),
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: wp(4.5) }}>
                🖼️ Kies uit galerij
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ReportIssue;
