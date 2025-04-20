import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from 'expo-router';

const COLORS = ['#A970FF', '#F59E0B', '#10B981', '#EF4444'];

const AppSettings = () => {
    const router = useRouter();
    const navigation = useNavigation();

    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [accentColor, setAccentColor] = useState(COLORS[0]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: '#0D0A1F' },
            headerTintColor: '#FFFFFF',
            headerTitle: 'App Instellingen',
            headerBackTitle: 'Terug',
        });
    }, [navigation]);

    // Laden van instellingen uit AsyncStorage bij scherm openen
    useEffect(() => {
        const loadSettings = async () => {
            const dark = await AsyncStorage.getItem('setting_darkMode');
            const notif = await AsyncStorage.getItem('setting_notifications');
            const color = await AsyncStorage.getItem('setting_accentColor');

            if (dark !== null) setDarkMode(dark === 'true');
            if (notif !== null) setNotifications(notif === 'true');
            if (color) setAccentColor(color);
        };

        loadSettings();
    }, []);

    // Automatisch opslaan bij wijziging van darkMode
    useEffect(() => {
        AsyncStorage.setItem('setting_darkMode', darkMode.toString());
    }, [darkMode]);

    // Automatisch opslaan bij wijziging van notifications
    useEffect(() => {
        AsyncStorage.setItem('setting_notifications', notifications.toString());
    }, [notifications]);

    // Automatisch opslaan bij wijziging van accentColor
    useEffect(() => {
        AsyncStorage.setItem('setting_accentColor', accentColor);
    }, [accentColor]);

    // Feedback geven bij wijzigen van instellingen
    const handleChangeAccentColor = (color: string) => {
        setAccentColor(color);
        Alert.alert('Accentkleur gewijzigd!', `Nieuwe kleur ingesteld: ${color}`);
    };

    return (
        <View className="flex-1 bg-primary px-6 py-10">
            <Text className="text-white text-2xl font-bold mb-6">App Instellingen</Text>

            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-lg">Donker thema</Text>
                <Switch
                    value={darkMode}
                    onValueChange={(value) => {
                        setDarkMode(value);
                        Alert.alert('Donker thema aangepast!', value ? 'Geactiveerd' : 'Gedeactiveerd');
                    }}
                    trackColor={{ false: "#767577", true: "#A970FF" }}
                    thumbColor={darkMode ? "#fff" : "#f4f3f4"}
                />
            </View>

            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-lg">Meldingen</Text>
                <Switch
                    value={notifications}
                    onValueChange={(value) => {
                        setNotifications(value);
                        Alert.alert('Meldingen aangepast!', value ? 'Geactiveerd' : 'Gedeactiveerd');
                    }}
                    trackColor={{ false: "#767577", true: "#A970FF" }}
                    thumbColor={notifications ? "#fff" : "#f4f3f4"}
                />
            </View>

            <Text className="text-white text-lg mb-2">Accentkleur</Text>
            <View className="flex-row mb-8">
                {COLORS.map((color, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleChangeAccentColor(color)}
                        style={{
                            backgroundColor: color,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginRight: 12,
                            borderWidth: accentColor === color ? 3 : 1,
                            borderColor: accentColor === color ? 'white' : 'gray',
                        }}
                    />
                ))}
            </View>

            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Instellingen', 'Instellingen zijn al automatisch opgeslagen.');
                    router.back();
                }}
                className="bg-purple-600 py-3 rounded-lg items-center"
            >
                <Text className="text-white font-bold text-lg">Sluiten</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AppSettings;
