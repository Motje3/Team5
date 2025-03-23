import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images'; // Assuming a profile picture exists

const Profile = () => {
    return (
        <View className="bg-primary flex-1">
            {/* Curved Top Header */}
            <View style={{
                backgroundColor: "#3E1F92", // Darker Purple Shade
                height: 70,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                justifyContent: "center",
                alignItems: "center",
            }}>
                
                <Text className="text-white text-xl font-bold mt-6">Profiel</Text>
            </View>

            {/* Profile Info */}
            <View className="items-center mt-20">
                <Image 
                    source={images.tyron} // Replace with actual profile picture
                    style={{ width: 90, height: 90, borderRadius: 50 }}
                />
                <Text className="text-white text-lg font-bold mt-2">Tyrone Woodly</Text>
                <Text className="text-gray-400 text-sm">TyroneWood@gmail.com</Text>
            </View>

            {/* Profile Options */}
            <View className="mt-6 px-8">
                {[
                    { title: "Edit Profile", icon: icons.edit },
                    { title: "Change Password", icon: icons.lock },
                    { title: "Settings", icon: icons.setting },
                    { title: "Logout", icon: icons.logout, color: "text-red-500" },
                ].map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        className="flex-row items-center py-4 border-b border-gray-700"
                    >
                        <Image 
                            source={item.icon} 
                            style={{ width: 24, height: 24, tintColor: "#A970FF", marginRight: 12 }}
                        />
                        <Text className={`text-gray-300 text-lg ${item.color || ""}`}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default Profile;
