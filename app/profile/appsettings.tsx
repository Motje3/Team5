import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from 'expo-router';
import ThemeContext from './ThemeContext'; // ✅ Accentkleur context importeren

const COLORS = ['#A970FF', '#F59E0B', '#10B981', '#EF4444'];

const AppSettings = () => {
    const router = useRouter();
    const navigation = useNavigation();

    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [localAccentColor, setLocalAccentColor] = useState(COLORS[0]);

    const { accentColor, updateAccentColor } = useContext(ThemeContext); // ✅ Context gebruiken

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: '#0D0A1F' },
            headerTintColor: '#FFFFFF',
            headerTitle: 'App Instellingen',
            headerBackTitle: 'Terug',
        });
    }, [navigation]);

    useEffect(() => {
        const loadSettings = async () => {
            const dark = await AsyncStorage.getItem('setting_darkMode');
            const notif = await AsyncStorage.getItem('setting_notifications');
            const color = await AsyncStorage.getItem('setting_accentColor');

            if (dark !== null) setDarkMode(dark === 'true');
            if (notif !== null) setNotifications(notif === 'true');
            if (color) setLocalAccentColor(color);
        };

        loadSettings();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('setting_darkMode', darkMode.toString());
    }, [darkMode]);

    useEffect(() => {
        AsyncStorage.setItem('setting_notifications', notifications.toString());
    }, [notifications]);

    const handleChangeAccentColor = (color: string) => {
        setLocalAccentColor(color);           // lokale kleur veranderen voor border
        updateAccentColor(color);             // ✅ context bijwerken = hele app updaten
        Alert.alert('Accentkleur gewijzigd!', `Nieuwe kleur ingesteld: ${color}`);
    };

    return (
        <View className="flex-1 bg-primary px-6 py-10">
            <Text className="text-white text-2xl font-bold mb-6">App Instellingen</Text>

            {/* Donker thema toggle */}
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-lg">Donker thema</Text>
                <Switch
                    value={darkMode}
                    onValueChange={(value) => {
                        setDarkMode(value);
                        Alert.alert('Donker thema aangepast!', value ? 'Geactiveerd' : 'Gedeactiveerd');
                    }}
                    trackColor={{ false: "#767577", true: accentColor }}
                    thumbColor={darkMode ? "#fff" : "#f4f3f4"}
                />
            </View>

            {/* Meldingen toggle */}
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-lg">Meldingen</Text>
                <Switch
                    value={notifications}
                    onValueChange={(value) => {
                        setNotifications(value);
                        Alert.alert('Meldingen aangepast!', value ? 'Geactiveerd' : 'Gedeactiveerd');
                    }}
                    trackColor={{ false: "#767577", true: accentColor }}
                    thumbColor={notifications ? "#fff" : "#f4f3f4"}
                />
            </View>

            {/* Accentkleur selectie */}
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
                            borderWidth: localAccentColor === color ? 3 : 1,
                            borderColor: localAccentColor === color ? 'white' : 'gray',
                        }}
                    />
                ))}
            </View>

            {/* Sluiten knop */}
            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Instellingen', 'Instellingen zijn al automatisch opgeslagen.');
                    router.back();
                }}
                style={{
                    backgroundColor: accentColor,
                    paddingVertical: 12,
                    borderRadius: 10,
                    alignItems: 'center',
                }}
            >
                <Text className="text-white font-bold text-lg">Sluiten</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AppSettings;
