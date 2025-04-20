import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
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
    <LinearGradient
      colors={["#17144F", "#090723"]} // Dark gradient background
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 p-6 justify-center items-center"
    >
      <StatusBar hidden />

      {/* ✅ Check Icon */}
      <Image 
        source={icons.checked}  
        style={{ width: 80, height: 80, marginBottom: 10 }}
      />

      {/* ✅ Scanned Successfully Text */}
      <Text className="text-green-400 text-2xl font-bold mb-4">Succesvol gescand</Text>

      {/* ✅ Shipment Details Card */}
      <LinearGradient
        colors={["#1E1B4B", "#13112D"]} // Matching card style
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "100%",
          padding: 20,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10, // Android shadow
          borderWidth: 1,
          borderColor: "#2D2A5A",
        }}
      >
        <Text className="text-white text-xl font-bold mb-4">Zendingdetails</Text>
        <Text className="text-gray-300 text-lg">🚚 Status: <Text className="text-yellow-400">{shipment.status}</Text></Text>
        <Text className="text-gray-300 text-lg">📍 Bestemming: <Text className="text-blue-400">{shipment.destination}</Text></Text>
        <Text className="text-gray-300 text-lg">⏳ Verwachte leveringtijd: <Text className="text-purple-400">{shipment.expectedDelivery}</Text></Text>
        <Text className="text-gray-300 text-lg">⚖️ Gewicht: <Text className="text-red-400">{shipment.weight}</Text></Text>
      </LinearGradient>

      {/* ✅ Scan Again Button & Issue Icon */}
      <View className="flex-row mt-6 items-center">
        <TouchableOpacity
          className="flex-row items-center px-6 py-3 rounded-lg"
          style={{
            backgroundColor: "#6C5CE7",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 6,
          }}
          onPress={() => router.push('/(tabs)/scan')}
        >
          <Image 
            source={icons.qrcode}  
            style={{ width: 24, height: 24, tintColor: "#fff", marginRight: 8 }}
          />
          <Text className="text-white text-lg font-semibold">Opnieuw scannen</Text>
        </TouchableOpacity>

        {/* 🔴 Issue Icon - now touchable */}
        <TouchableOpacity onPress={() => router.push('/shipment/reportissue')}>
          <Image 
            source={icons.issue}  
            style={{ width: 54, height: 49, marginLeft: 12 }}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ShipmentDetails;
