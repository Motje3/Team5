import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';


const Todaysshipment = () => {
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