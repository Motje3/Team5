import { View, Text, Image, TouchableOpacity, StatusBar, FlatList } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Todaysshipment = () => {
    const router = useRouter();

    //Test data
    const shipments = [
        { id: "1", title: "Pakket A", date: "2025-04-20" },
        { id: "2", title: "Pakket B", date: "2025-04-19" },
        { id: "3", title: "Pakket C", date: "2025-04-20" },
      ];

    const today = new Date().toISOString().split("T")[0];
    const todaysShipments = shipments.filter((s) => s.date === today);

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
                        top: 15,
                        left: -15,
                        zIndex: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Ionicons name="arrow-back" size={30} color="white" />
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: 8 }}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*titel*/}
            <View className="flex-row justify-between items-center pt-16">
                <View>
                    <Text className="text-white text-2xl font-bold">Zendingen van vandaag</Text>
                </View>
            </View>

            <View style={{ marginBottom: 12 }}>
                <Text style={{ color: "gray", fontSize: 14 }}>
                    Totale openstaande zendingen vandaag: {todaysShipments.length}
                </Text> 
            </View>
            
            {/* Shipment List */}
            {todaysShipments.length > 0 ? (
                <FlatList
                data={todaysShipments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                    style={{
                        backgroundColor: "#111",
                        padding: 16,
                        borderRadius: 8,
                        marginBottom: 12,
                    }}
                    >
                    <Text style={{ color: "white", fontSize: 16 }}>{item.title}</Text>
                    <Text style={{ color: "gray", fontSize: 12 }}>{item.date}</Text>
                    </View>
                )}
                />
            ) : (
                <Text style={{ color: "gray" }}>Geen zendingen voor vandaag.</Text>
            )}
        </LinearGradient>
    );
};

export default Todaysshipment