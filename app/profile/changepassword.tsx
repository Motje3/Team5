import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = () => {
    const router = useRouter();
    const navigation = useNavigation();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: '#0D0A1F' },
            headerTintColor: '#FFFFFF',
            headerTitle: 'Wachtwoord aanpassen',
            headerBackTitle: 'Terug',
        });
    }, [navigation]);

    const handleSave = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Vul alle velden in');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Wachtwoorden komen niet overeen');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Minimaal 6 tekens vereist');
            return;
        }

        try {
            await AsyncStorage.setItem('profile_password', newPassword);
            Alert.alert('Wachtwoord opgeslagen!');
            router.back();
        } catch (error) {
            console.error('Fout bij opslaan wachtwoord:', error);
            Alert.alert('Opslaan mislukt');
        }
    };

    return (
        <View className="flex-1 bg-primary px-6 py-10">
            <Text className="text-white text-2xl font-bold mb-6">Wachtwoord Aanpassen</Text>

            <Text className="text-gray-300 mb-1">Nieuw wachtwoord</Text>
            <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-4"
            />

            <Text className="text-gray-300 mb-1">Bevestig wachtwoord</Text>
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-8"
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

export default ChangePassword;
