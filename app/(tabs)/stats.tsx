import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

const Stats = () => {
  // Dummy shipment stats
  const shipmentStats = {
    total: 124, // Total processed shipments
    completed: 98, // Successfully completed
    pending: 26, // Still in transit
  };

  // Dummy recent activity data
  const recentShipments = [
    { id: "SHIP-101", status: "Completed", time: "10:30 AM" },
    { id: "SHIP-102", status: "Pending", time: "11:00 AM" },
    { id: "SHIP-103", status: "Completed", time: "11:45 AM" },
    { id: "SHIP-104", status: "Pending", time: "12:15 PM" },
    { id: "SHIP-105", status: "Completed", time: "01:00 PM" },
    
  ];

  return (
    <View className="bg-gray-900 flex-1 px-6 py-6">
      
      {/* 🔹 Page Header */}
      <View className="flex items-center mb-6">
        <Image 
          source={icons.stats}  
          style={{ width: 50, height: 50, tintColor: "#A970FF", marginTop: 25 }} 
        />
        <Text className="text-white text-2xl font-bold mt-2">Your Stats</Text>
      </View>

      {/* 📦 Shipment Overview */}
      <View className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700">
        <Text className="text-white text-lg font-bold mb-4">Shipment Overview</Text>
        
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-purple-400 text-3xl font-bold">{shipmentStats.total}</Text>
            <Text className="text-gray-400">Total</Text>
          </View>

          <View className="items-center">
            <Text className="text-green-400 text-3xl font-bold">{shipmentStats.completed}</Text>
            <Text className="text-gray-400">Completed</Text>
          </View>

          <View className="items-center">
            <Text className="text-yellow-400 text-3xl font-bold">{shipmentStats.pending}</Text>
            <Text className="text-gray-400">Pending</Text>
          </View>
        </View>
      </View>

      {/* 🕒 Recent Activity */}
      <View className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700 mt-6">
        <Text className="text-white text-lg font-bold mb-4">Recent Activity</Text>

        <FlatList
          data={recentShipments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 border-b border-gray-700">
              <Text className="text-gray-300">{item.id}</Text>
              <Text className={`text-lg ${item.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
                {item.status}
              </Text>
              <Text className="text-gray-500">{item.time}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
    </View>
  );
};

export default Stats;
