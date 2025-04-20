import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Todaysshipment = () => {
    const router = useRouter();
    return (
        <LinearGradient
            colors={["#3D0F6E", "#030014"]}
            locations={[0, 0.7, 1]}
            start={{ x: 0.5, y: 0 }} 
            end={{ x: 0.5, y: 0.25 }}
            style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40 }} 
            >

            <ExpoStatusBar hidden />
            <StatusBar hidden />

            <View style={{
                }}>
                <TouchableOpacity onPress={() => router.back()}
                    style={{
                        position: 'absolute',
                        top: -35,
                        left: -15,
                        zIndex: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Ionicons name="arrow-back" size={30} color="white" />
                    <Text style={{ color: 'white', fontSize: 16, marginLeft: 8 }}>Back</Text>
                </TouchableOpacity>
            </View>

            {/* 🔹 Welcome Header */}
            <View className="flex-row justify-between items-center">
                <View>
                    <Text className="text-white text-2xl font-bold">Zendingen van vandaag</Text>
                </View>
            </View>
 
        </LinearGradient>
    );
};

export default Todaysshipment