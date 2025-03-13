import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { icons } from '@/constants/icons'; // Import icons

const ShipmentDetails = () => {
  const router = useRouter();
  const { qrData } = useLocalSearchParams();

  let shipment = {
    status: "Pending",
    destination: "Unknown",
    expectedDelivery: "Unknown",
    weight: "Unknown",
  };

  // Try parsing JSON if QR data is valid
  try {
    const parsedData = JSON.parse(Array.isArray(qrData) ? qrData[0] : qrData);
    shipment = { ...shipment, ...parsedData };
  } catch (error) {
    console.log("Scanned data is not JSON, using default format.");
  }

  return (
    <View className="flex-1 bg-gray-900 p-6 justify-center items-center">
      <StatusBar hidden />

      {/* ✅ Big Check Icon */}
      <Image 
        source={icons.checked}  
        style={{ width: 80, height: 80, marginBottom: 10 }}
      />

      {/* ✅ Scanned Successfully Text */}
      <Text className="text-green-400 text-2xl font-bold mb-4">Scanned Successfully</Text>

      {/* ✅ Shipment Details */}
      <View className="w-full bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <Text className="text-white text-xl font-bold mb-4">Shipment Details</Text>
        <Text className="text-gray-300 text-lg">🚚 Status: {shipment.status}</Text>
        <Text className="text-gray-300 text-lg">📍 Destination: {shipment.destination}</Text>
        <Text className="text-gray-300 text-lg">⏳ Expected Delivery: {shipment.expectedDelivery}</Text>
        <Text className="text-gray-300 text-lg">⚖️ Weight: {shipment.weight}</Text>
      </View>

      {/* ✅ Scan Again Button + Issue Icon */}
      <View className="flex-row mt-6 items-center">
        <TouchableOpacity
          className="bg-blue-500 flex-row items-center px-6 py-3 rounded-lg"
          onPress={() => router.push('/(tabs)/scan')}
        >
          <Image 
            source={icons.qrcode}  
            style={{ width: 24, height: 24, tintColor: "#fff", marginRight: 8 }}
          />
          <Text className="text-white text-lg">Scan Again</Text>
        </TouchableOpacity>

        {/* Small Red Issue Icon */}
        <Image 
          source={icons.issue}  
          style={{ width: 45, height: 46, marginLeft: 12 }}
        />
      </View>
    </View>
  );
};

export default ShipmentDetails;
