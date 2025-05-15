import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
  StyleSheet,
  ImageSourcePropType  // Added this import
} from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '@/constants/icons';
import { wp, hp } from '../utils/responsive';
import { useApp } from '../context/AppContext';

export default function ReportIssue() {
  const router = useRouter();
  const { shipmentId } = useLocalSearchParams<{ shipmentId: string }>();
  const { darkMode, accentColor } = useApp();

  const fadeAnim = React.useRef(new Animated.Value(1)).current;

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
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      router.navigate(`/shipment/shipmentdetails?qrData=${shipmentId}`);

    });
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack
    );
    return () => backHandler.remove();
  }, []);

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
      const res = await fetch('http://192.168.2.50:5070/api/IssueReport', {
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
        colors={darkMode ? ['#17144F', '#090723'] : ['#f3f4f6', '#ffffff']}
        locations={[0.3, 1]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          <ScrollView contentContainerStyle={styles.scroll}>
            <Image
              source={icons.reportproblem as ImageSourcePropType}
              style={styles.image}
            />
            <Text style={[styles.heading, { color: theme.text }]}>Probleem melden</Text>

            <View style={styles.inputWrapper}>
              <Text style={{ color: theme.text, marginBottom: hp(1) }}>Titel</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Bijv. QR-code werkt niet"
                placeholderTextColor={theme.placeholder}
                style={[styles.input, { backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.text }]}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={{ color: theme.text, marginBottom: hp(1) }}>Omschrijving</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Beschrijf het probleem"
                placeholderTextColor={theme.placeholder}
                style={[styles.textArea, { backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.text }]}
                multiline
              />
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={[styles.photoButton, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
            >
              <Text style={{ color: theme.text }}>
                {imageUri ? 'Foto wijzigen' : 'Voeg een foto toe'}
              </Text>
            </TouchableOpacity>

            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.preview}
                resizeMode="cover"
              />
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={submitting}
              style={[styles.submitButton, { backgroundColor: accentColor, opacity: submitting ? 0.6 : 1 }]}
            >
              <Text style={styles.submitText}>{submitting ? 'Verzenden...' : 'Indienen'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleBack}
              style={[styles.backButton, { borderColor: accentColor }]}
            >
              <Image source={icons.arrowleft as ImageSourcePropType} style={styles.backIcon} />
              <Text style={[styles.backText, { color: accentColor }]}>Terug</Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.modal}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriver
          >
            <View style={[styles.modalContent, { backgroundColor: theme.cardBg }]}>...
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gradient: { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  scroll: { padding: wp(6), alignItems: 'center' },
  image: { width: wp(36), height: wp(36), marginBottom: hp(2), marginTop: hp(5) },
  heading: { fontSize: wp(6), fontWeight: 'bold', marginBottom: hp(4) },
  inputWrapper: { alignSelf: 'stretch', marginBottom: hp(2) },
  input: { padding: wp(4), borderRadius: wp(2), borderWidth: 1 },
  textArea: { padding: wp(4), borderRadius: wp(2), borderWidth: 1, height: hp(20), textAlignVertical: 'top' },
  photoButton: { padding: hp(1.5), borderRadius: wp(2), borderWidth: 1, marginBottom: hp(2), width: '100%', alignItems: 'center' },
  preview: { width: '100%', height: hp(25), borderRadius: wp(2), marginBottom: hp(2) },
  submitButton: { padding: hp(2), borderRadius: wp(2), width: '100%', alignItems: 'center', marginBottom: hp(3) },
  submitText: { color: '#fff', fontSize: wp(4.5), fontWeight: '600' },
  backButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', paddingVertical: hp(1), paddingHorizontal: wp(2), borderWidth: 2, borderRadius: wp(4) },
  backIcon: { width: wp(6), height: wp(6), marginRight: wp(2) },
  backText: { fontSize: wp(3.5), fontWeight: '600' },
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: { padding: wp(6), borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5) },
});