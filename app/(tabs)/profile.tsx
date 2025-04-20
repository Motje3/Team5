import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ThemeContext from '../profile/ThemeContext'; // ✅ accentkleur context

const Profile = () => {
    const router = useRouter();
    const { accentColor } = useContext(ThemeContext); // ✅ accentkleur ophalen

    const [name, setName] = useState<string>('Laden...');
    const [email, setEmail] = useState<string>('Laden...');
    const [image, setImage] = useState<string | null>(null);

    const loadProfileData = async () => {
        try {
            const storedName = await AsyncStorage.getItem('profile_name');
            const storedEmail = await AsyncStorage.getItem('profile_email');
            const storedImage = await AsyncStorage.getItem('profile_image');

            if (storedName) setName(storedName);
            if (storedEmail) setEmail(storedEmail);
            if (storedImage) setImage(storedImage);
        } catch (e) {
            console.error('Fout bij laden profielgegevens:', e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadProfileData();
        }, [])
    );

    const handleEditProfile = () => {
        router.push("/profile/editprofile");
    };

    const handleChangePassword = () => {
        router.push("/profile/changepassword");
    };

    const handleSettings = () => {
        router.push("/profile/appsettings");
    };

    const handleLogout = () => {
        router.replace("/login/loginpage");
    };

    return (
        <View className="bg-primary flex-1">
            {/* Header */}
            <View
                style={{
                    backgroundColor: accentColor, // ✅ accentkleur toegepast
                    height: 110,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text className="text-white text-xl font-bold mt-6">Profiel</Text>
            </View>

            {/* Gebruikersinfo */}
            <View className="items-center mt-20">
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 90, height: 90, borderRadius: 50 }}
                    />
                ) : (
                    <Image
                        source={images.tyron}
                        style={{ width: 90, height: 90, borderRadius: 50 }}
                    />
                )}
                <Text className="text-white text-lg font-bold mt-2">{name}</Text>
                <Text className="text-gray-400 text-sm">{email}</Text>
            </View>

            {/* Menu items */}
            <View className="mt-6 px-8">
                {[
                    { title: "Profiel bewerken", icon: icons.edit, action: handleEditProfile },
                    { title: "Wachtwoord aanpassen", icon: icons.lock, action: handleChangePassword },
                    { title: "App instellingen", icon: icons.setting, action: handleSettings },
                    { title: "Uitloggen", icon: icons.logout, color: "#EF4444", action: handleLogout },
                ].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={item.action || (() => {})}
                        className="flex-row items-center py-4 border-b border-gray-700"
                    >
                        <Image
                            source={item.icon}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: item.color || accentColor, // ✅ hier wordt accentkleur toegepast
                                marginRight: 12,
                            }}
                        />
                        <Text
                            className="text-lg"
                            style={{ color: item.color || "#D1D5DB" }}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default Profile;
