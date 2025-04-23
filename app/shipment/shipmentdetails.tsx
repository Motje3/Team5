import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { icons } from '@/constants/icons';
import { wp, hp } from '../utils/responsive';

const ShipmentDetails = () => {
  const router = useRouter();
  const { qrData } = useLocalSearchParams();

  const [shipment, setShipment] = useState<any>(null);
  const [shipmentStatus, setShipmentStatus] = useState("Geleverd");
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const id = Array.isArray(qrData) ? qrData[0] : qrData;
        const response = await fetch(`http://192.168.1.114:5070/api/shipments/${id}`);

        const data = await response.json();
        setShipment(data);
        setShipmentStatus(data.status);
      } catch (error) {
        console.error("Fout bij ophalen van zending:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [qrData]);

  const updateStatus = (newStatus: string) => {
    setShipmentStatus(newStatus);
    setStatusModalVisible(false);
    // TODO: send PUT request to backend later
  };

  if (loading || !shipment) {
    return (
      <View className="flex-1 justify-center items-center bg-[#090723]">
        <Text className="text-white">Laden...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#17144F", "#090723"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        paddingHorizontal: wp(6),
        paddingTop: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StatusBar hidden />

      <Image 
        source={icons.checked}  
        style={{ width: wp(20), height: wp(20), marginBottom: hp(1.5) }}
      />

      <Text className="text-green-400 text-2xl font-bold mb-4">Succesvol gescand</Text>

      <LinearGradient
        colors={["#1E1B4B", "#13112D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: '100%',
          padding: wp(5),
          borderRadius: wp(5),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10,
          borderWidth: 1,
          borderColor: "#2D2A5A",
        }}
      >
        <Text style={{ color: '#fff', fontSize: wp(5), fontWeight: 'bold', marginBottom: hp(2) }}>
          Zendingdetails
        </Text>
        <Text style={{ color: '#D1D5DB', fontSize: wp(4.2), marginBottom: hp(0.5) }}>
          🚚 Status: <Text style={{ color: "#FACC15" }}>{shipmentStatus}</Text>
        </Text>
        <Text style={{ color: '#D1D5DB', fontSize: wp(4.2), marginBottom: hp(0.5) }}>
          📍 Bestemming: <Text style={{ color: "#60A5FA" }}>{shipment.destination}</Text>
        </Text>
        <Text style={{ color: '#D1D5DB', fontSize: wp(4.2), marginBottom: hp(0.5) }}>
          ⏳ Verwachte leveringtijd: <Text style={{ color: "#C084FC" }}>{shipment.expectedDelivery}</Text>
        </Text>
        <Text style={{ color: '#D1D5DB', fontSize: wp(4.2) }}>
          ⚖️ Gewicht: <Text style={{ color: "#F87171" }}>{shipment.weight}</Text>
        </Text>
      </LinearGradient>

      {/* ✨ Status wijzigen */}
      <LinearGradient
        colors={["#1E1B4B", "#13112D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: '100%',
          padding: wp(5),
          borderRadius: wp(5),
          marginTop: hp(3),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10,
          borderWidth: 1,
          borderColor: "#2D2A5A",
        }}
      >
        <TouchableOpacity onPress={() => setStatusModalVisible(true)} style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: wp(4.5), fontWeight: 'bold' }}>📦 Status wijzigen</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Buttons */}
      <View className="flex-row mt-6 w-full justify-between">
        <TouchableOpacity
          style={{
            flex: 1,
            marginRight: wp(2),
            backgroundColor: '#790600',
            paddingVertical: hp(2),
            borderRadius: wp(4),
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 6,
          }}
          onPress={() => router.push(`/shipment/reportissue?shipmentId=${shipment.id}`)}
        >
          <Image source={icons.issue} style={{ width: wp(10), height: wp(10), marginBottom: hp(1) }} />
          <Text style={{ color: '#fff', fontSize: wp(3.8), fontWeight: '600' }}>Probleem melden</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: wp(2),
            backgroundColor: '#6C5CE7',
            paddingVertical: hp(2),
            borderRadius: wp(4),
            alignItems: 'center',
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
            style={{ width: wp(9), height: wp(9), tintColor: "#fff", marginBottom: hp(1) }}
          />
          <Text style={{ color: '#fff', fontSize: wp(3.8), fontWeight: '600' }}>Volgende scannen</Text>
        </TouchableOpacity>
      </View>

      {/* 🧊 Modal */}
      <Modal
        isVisible={statusModalVisible}
        onBackdropPress={() => setStatusModalVisible(false)}
        style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
      >
        <View style={{
          backgroundColor: '#1E1B33',
          width: '85%',
          padding: wp(6),
          borderRadius: wp(5),
        }}>
          <Text style={{
            color: '#fff',
            fontSize: wp(5),
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: hp(2),
          }}>
            📦 Kies nieuwe status
          </Text>

          {["Onderweg", "Geleverd", "Vertraagd"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => updateStatus(option)}
              style={{
                backgroundColor: '#7C3AED',
                paddingVertical: hp(2),
                borderRadius: wp(3),
                alignItems: 'center',
                marginBottom: hp(1.5),
              }}
            >
              <Text style={{ color: '#fff', fontSize: wp(4.2) }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default ShipmentDetails;
