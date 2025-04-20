import { View, Text, Image, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { icons } from '@/constants/icons';
import { LinearGradient } from 'expo-linear-gradient';
import ThemeContext from '../profile/ThemeContext'; // ✅ Accentkleur context

const Stats = () => {
  const { accentColor } = useContext(ThemeContext); // ✅ Accentkleur ophalen

  // Dummy shipment stats
  const shipmentStats = {
    total: 124, // Total processed shipments
    completed: 98, // Successfully completed
    pending: 26, // Still in transit
  };

  // Dummy recent activity data
  const recentShipments = [
    { id: "SHIP-101", status: "Afgerond", time: "10:30 AM" },
    { id: "SHIP-102", status: "In afwachting", time: "11:00 AM" },
    { id: "SHIP-103", status: "Afgerond", time: "11:45 AM" },
    { id: "SHIP-104", status: "In afwachting", time: "12:15 PM" },
    { id: "SHIP-105", status: "Afgerond", time: "01:00 PM" },
  ];

  return (
    <View className="bg-primary flex-1 px-6 py-6">

      {/* 🔹 Page Header */}
      <View className="flex items-center mb-6">
        <Image 
          source={icons.stats}  
          style={{ width: 50, height: 50, tintColor: accentColor, marginTop: 25 }} // ✅ Accentkleur hier
        />
        <Text className="text-white text-2xl font-bold mt-2">Jouw zendingen</Text>
      </View>

      {/* 📦 Shipment Overview with Gradient Effect */}
      <LinearGradient
        colors={["#17144F", "#090723"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          padding: 20,
          borderRadius: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
          elevation: 8,
          marginBottom: 15,
        }}
      >
        <Text className="text-white text-lg font-bold mb-4">Jouw zendingen</Text>
        
        <View className="flex-row justify-between w-full px-4">
          <View className="items-center">
            <Text style={{ color: accentColor }} className="text-3xl font-bold">{shipmentStats.total}</Text>
            <Text className="text-gray-300">Totaal</Text>
          </View>

          <View className="items-center">
            <Text className="text-green-400 text-3xl font-bold">{shipmentStats.completed}</Text>
            <Text className="text-gray-300">Voltooid</Text>
          </View>

          <View className="items-center">
            <Text className="text-yellow-400 text-3xl font-bold">{shipmentStats.pending}</Text>
            <Text className="text-gray-300">In behandeling</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 🕒 Recent Activity with Gradient Effect */}
      <LinearGradient
        colors={["#17144F", "#090723"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          padding: 20,
          borderRadius: 20, 
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        <Text className="text-white text-lg font-bold mb-4">Recente activiteit</Text>

        <FlatList
          data={recentShipments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 border-b border-gray-700">
              <Text className="text-gray-300">{item.id}</Text>
              <Text
                className="text-lg"
                style={{
                  color: item.status === "Afgerond" ? "#10B981" : "#F59E0B"
                }}
              >
                {item.status}
              </Text>
              <Text className="text-gray-500">{item.time}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>

    </View>
  );
};

export default Stats;
