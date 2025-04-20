import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from 'expo-router';

const EditProfile = () => {
    const router = useRouter();
    const navigation = useNavigation();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);

    // ✅ Pas de header aan
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: '#0D0A1F' },
            headerTintColor: '#FFFFFF',
            headerTitle: 'Profiel Bewerken',
            headerBackTitle: 'Terug',
        });
    }, [navigation]);

    // ✅ Haal eerder opgeslagen profiel op
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const savedName = await AsyncStorage.getItem('profile_name');
                const savedEmail = await AsyncStorage.getItem('profile_email');
                const savedImage = await AsyncStorage.getItem('profile_image');

                if (savedName) setName(savedName);
                if (savedEmail) setEmail(savedEmail);
                if (savedImage) setImage(savedImage);
            } catch (e) {
                console.error('Fout bij laden profiel:', e);
            }
        };

        loadProfile();
    }, []);

    // ✅ Foto kiezen
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    // ✅ Opslaan naar AsyncStorage
    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('profile_name', name);
            await AsyncStorage.setItem('profile_email', email);
            if (image) {
                await AsyncStorage.setItem('profile_image', image);
            }

            Alert.alert("Profiel opgeslagen!");
            router.back(); // terug naar profielpagina
        } catch (e) {
            console.error('Fout bij opslaan:', e);
            Alert.alert("Opslaan mislukt");
        }
    };

    return (
        <View className="flex-1 bg-primary px-6 py-10">
            <Text className="text-white text-2xl font-bold mb-6">Profiel Bewerken</Text>

            <TouchableOpacity onPress={pickImage} className="items-center mb-6">
                {image ? (
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                ) : (
                    <View className="w-24 h-24 bg-gray-700 rounded-full items-center justify-center">
                        <Text className="text-white">Kies Foto</Text>
                    </View>
                )}
            </TouchableOpacity>

            <Text className="text-gray-300 mb-1">Naam</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-4"
            />

            <Text className="text-gray-300 mb-1">Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-8"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity
                onPress={handleSave}
                className="bg-purple-600 py-3 rounded-lg items-center"
            >
                <Text className="text-white font-bold text-lg">Opslaan</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfile;
