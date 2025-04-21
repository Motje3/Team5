import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { icons } from '@/constants/icons';

const ShipmentDetails = () => {
  const router = useRouter();
  const { qrData } = useLocalSearchParams();

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [shipmentStatus, setShipmentStatus] = useState("Geleverd");

  let shipment = {
    status: shipmentStatus,
    destination: "Niet bekend",
    expectedDelivery: "Niet bekend",
    weight: "Niet bekend",
  };

  try {
    const parsedData = JSON.parse(Array.isArray(qrData) ? qrData[0] : qrData);
    shipment = { ...shipment, ...parsedData };
  } catch (error) {
    console.log("Scanned data is not JSON, using default format.");
  }

  const updateStatus = (newStatus: string) => {
    setShipmentStatus(newStatus);
    setStatusModalVisible(false);
  };

  return (
    <LinearGradient
      colors={["#17144F", "#090723"]}
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
        colors={["#1E1B4B", "#13112D"]}
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
          elevation: 10,
          borderWidth: 1,
          borderColor: "#2D2A5A",
        }}
      >
        <Text className="text-white text-xl font-bold mb-4">Zendingdetails</Text>
        <Text className="text-gray-300 text-lg">🚚 Status: <Text className="text-yellow-400">{shipmentStatus}</Text></Text>
        <Text className="text-gray-300 text-lg">📍 Bestemming: <Text className="text-blue-400">{shipment.destination}</Text></Text>
        <Text className="text-gray-300 text-lg">⏳ Verwachte leveringtijd: <Text className="text-purple-400">{shipment.expectedDelivery}</Text></Text>
        <Text className="text-gray-300 text-lg">⚖️ Gewicht: <Text className="text-red-400">{shipment.weight}</Text></Text>
      </LinearGradient>

      {/* ✨ Status wijzigen button (styled like Zendingdetails) */}
      <LinearGradient
        colors={["#1E1B4B", "#13112D"]}
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
          elevation: 10,
          borderWidth: 1,
          borderColor: "#2D2A5A",
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => setStatusModalVisible(true)}
          className="w-full items-center"
        >
          <Text className="text-white text-lg font-bold">📦 Status wijzigen</Text>
        </TouchableOpacity>
      </LinearGradient>


      {/* ▶️ Volgende Scannen & ❗ Probleem Melden buttons */}
      <View className="flex-row mt-6 w-full justify-between">
        {/* Probleem Melden (left) */}
        <TouchableOpacity
          className="flex-1 mr-2 py-4 rounded-xl items-center justify-center"
          style={{
            backgroundColor: '#790600',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 6,
          }}
          onPress={() => router.push('/shipment/reportissue')}
        >
          <Image 
            source={icons.issue}  
            style={{ width: 45, height: 45, marginBottom: 6 }}
          />
          <Text className="text-white font-semibold">Probleem melden</Text>
        </TouchableOpacity>

        {/* Volgende Scannen (right) */}
        <TouchableOpacity
          className="flex-1 ml-2 py-4 rounded-xl items-center justify-center"
          style={{
            backgroundColor: '#6C5CE7',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 6,
          }}
          onPress={() => router.push('/(tabs)/scan')}
        >
          <Image 
            source={icons.qrcode}  
            style={{ width: 36, height: 36, tintColor: "#fff", marginBottom: 6 }}
          />
          <Text className="text-white font-semibold">Volgende scannen</Text>
        </TouchableOpacity>
      </View>

      {/* 🧊 Status Modal */}
      <Modal
        isVisible={statusModalVisible}
        onBackdropPress={() => setStatusModalVisible(false)}
        style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={300}
        animationOutTiming={200}
        backdropTransitionInTiming={150}
        backdropTransitionOutTiming={100}
      >
        <View className="bg-[#1E1B33] w-[85%] p-6 rounded-2xl">
          <Text className="text-white text-xl font-bold mb-4 text-center">📦 Kies nieuwe status</Text>

          {["Onderweg", "Geleverd", "Vertraagd"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => updateStatus(option)}
              className="bg-purple-700 py-3 rounded-lg items-center mb-3"
            >
              <Text className="text-white text-lg">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default ShipmentDetails;
