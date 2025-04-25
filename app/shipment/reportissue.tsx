import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  Animated,
} from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '@/constants/icons';
import { wp, hp } from '../utils/responsive';
import { useApp } from '../context/AppContext';

export default function ReportIssue() {
  const router = useRouter();
  const navigation = useNavigation();
  const { shipmentId } = useLocalSearchParams<{ shipmentId: string }>();
  const { darkMode, accentColor } = useApp();

  // Animated value for fade transition
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  // Inline theme
  const theme = {
    background: darkMode ? '#090723' : '#ffffff',
    cardBg: darkMode ? '#1E1B33' : '#f3f4f6',
    text: darkMode ? '#ffffff' : '#0f0D23',
    placeholder: darkMode ? '#6B7280' : '#A8A8A8',
    border: darkMode ? '#2D2A5A' : '#ddd',
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleBack = () => {
    // Animate the fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Navigate back after animation completes
      router.navigate(`/shipment/shipmentdetails?qrData=${shipmentId}`);
    });
    return true;
  };

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress', 
      handleBack
    );

    return () => backHandler.remove();
  }, []);

  // Fade in when component mounts
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Vul alle velden in.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('http://192.168.1.198:5070/api/IssueReport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          shipmentId: shipmentId ? parseInt(shipmentId) : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      Alert.alert('✅ Probleem succesvol gemeld!');
      handleBack();
    } catch {
      Alert.alert('❌ Indienen mislukt.');
    } finally {
      setSubmitting(false);
    }
  };

  const pickCamera = async () => {
    setModalVisible(false);
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return Alert.alert('Camera toegang vereist');
    const result = await ImagePicker.launchCameraAsync({ quality: 0.5, allowsEditing: true });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const pickGallery = async () => {
    setModalVisible(false);
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return Alert.alert('Galerij toegang vereist');
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5, allowsEditing: true });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <LinearGradient
        colors={darkMode ? ["#17144F", "#090723"] : ["#f3f4f6", "#ffffff"]}
        locations={[0.3, 1]}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ padding: wp(6), alignItems: 'center' }}>
            <Image
              source={icons.reportproblem}
              style={{ width: wp(36), height: wp(36), marginBottom: hp(3) }}
            />

            <Text style={{
              color: theme.text,
              fontSize: wp(6),
              fontWeight: 'bold',
              marginBottom: hp(4),
            }}>
              Probleem melden
            </Text>

            <View style={{ alignSelf: 'stretch', marginBottom: hp(2) }}>
              <Text style={{ color: theme.text, marginBottom: hp(1) }}>Titel</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Bijv. QR-code werkt niet"
                placeholderTextColor={theme.placeholder}
                style={{
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                  padding: wp(4),
                  borderRadius: wp(2),
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
              />
            </View>

            <View style={{ alignSelf: 'stretch', marginBottom: hp(2) }}>
              <Text style={{ color: theme.text, marginBottom: hp(1) }}>Omschrijving</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Beschrijf het probleem"
                placeholderTextColor={theme.placeholder}
                style={{
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                  padding: wp(4),
                  borderRadius: wp(2),
                  borderWidth: 1,
                  borderColor: theme.border,
                  height: hp(20),
                  textAlignVertical: 'top',
                }}
                multiline
              />
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: theme.cardBg,
                padding: hp(1.5),
                borderRadius: wp(2),
                borderWidth: 1,
                borderColor: theme.border,
                marginBottom: hp(2),
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.text }}>
                {imageUri ? 'Foto wijzigen' : 'Voeg een foto toe'}
              </Text>
            </TouchableOpacity>

            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: '100%',
                  height: hp(25),
                  borderRadius: wp(2),
                  marginBottom: hp(2),
                }}
                resizeMode="cover"
              />
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={submitting}
              style={{
                backgroundColor: accentColor,
                paddingVertical: hp(2),
                borderRadius: wp(2),
                width: '100%',
                alignItems: 'center',
                marginBottom: hp(3),
                opacity: submitting ? 0.6 : 1,
              }}
            >
              <Text style={{ color: '#fff', fontSize: wp(4.5), fontWeight: '600' }}>
                {submitting ? 'Verzenden...' : 'Indienen'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleBack}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image source={icons.arrowleft} style={{ width: wp(6), height: wp(6), marginRight: wp(2) }} />
              <Text style={{ color: theme.placeholder }}>Terug</Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={200}
            animationOutTiming={200}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={0}
            useNativeDriver={true}
          >
            <View style={{
              backgroundColor: theme.cardBg,
              padding: wp(6),
              borderTopLeftRadius: wp(5),
              borderTopRightRadius: wp(5),
            }}>
              <Text style={{
                color: theme.text,
                fontSize: wp(5),
                fontWeight: 'bold',
                marginBottom: hp(3),
                textAlign: 'center'
              }}>
                Foto toevoegen
              </Text>
              <TouchableOpacity
                onPress={pickCamera}
                style={{
                  backgroundColor: accentColor,
                  paddingVertical: hp(1.5),
                  borderRadius: wp(2),
                  alignItems: 'center',
                  marginBottom: hp(2),
                }}
              >
                <Text style={{ color: '#fff' }}>📷 Gebruik camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickGallery}
                style={{
                  backgroundColor: accentColor,
                  paddingVertical: hp(1.5),
                  borderRadius: wp(2),
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff' }}>🖼️ Kies uit galerij</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </LinearGradient>
    </Animated.View>
  );
}