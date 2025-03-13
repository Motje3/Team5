import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const ShipmentDetails = () => {
  const router = useRouter();
  const { qrData } = useLocalSearchParams();

  // Default shipment details
  let shipment = {
    status: "Pending",
    destination: "Unknown",
    expectedDelivery: "Unknown",
    weight: "Unknown",
  };

  // Parse QR data if it's valid JSON
  try {
    const parsedData = JSON.parse(Array.isArray(qrData) ? qrData[0] : qrData);
    shipment = { ...shipment, ...parsedData };
  } catch (error) {
    console.log("Scanned data is not JSON, using default values.");
  }

  return (
    <View className="flex-1 bg-gray-900 p-6 justify-center items-center">
      {/* Hide the white status bar */}
      <StatusBar style="light" hidden />

      {/* Success Message */}
      <Text className="text-green-400 text-2xl font-bold mb-4">
        ✅ Shipment Scanned Successfully
      </Text>

      {/* Shipment Details Box */}
      <View className="w-full bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <Text className="text-white text-xl font-bold mb-4">Shipment Details</Text>
        <Text className="text-gray-300 text-lg">🚚 Status: {shipment.status}</Text>
        <Text className="text-gray-300 text-lg">📍 Destination: {shipment.destination}</Text>
        <Text className="text-gray-300 text-lg">⚖ Weight: {shipment.weight}</Text>
        <Text className="text-gray-300 text-lg">⏳ Expected Delivery: {shipment.expectedDelivery}</Text>
      </View>

      {/* Buttons */}
      <View className="flex-row mt-6 space-x-4">
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => router.push('/(tabs)/scan')}
        >
          <Text className="text-white text-lg">🔄 Scan Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-lg"
          onPress={() => alert('Report feature coming soon!')}
        >
          <Text className="text-white text-lg">⚠ Report Issue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShipmentDetails;
