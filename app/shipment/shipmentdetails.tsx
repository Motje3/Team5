import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { icons } from '@/constants/icons';
import { wp, hp } from '../utils/responsive';
import { useApp } from '../context/AppContext';

const ShipmentDetails = () => {
  const router = useRouter();
  const { qrData } = useLocalSearchParams<{ qrData: string }>();
  const { darkMode } = useApp();

  // inline theme colors
  const theme = {
    background: darkMode ? '#090723' : '#ffffff',
    cardBg: darkMode ? '#1E1B4B' : '#f3f4f6',
    text: darkMode ? '#ffffff' : '#0f0D23',
    secondaryText: darkMode ? '#D1D5DB' : '#6B7280',
  };

  const [shipment, setShipment] = useState<any>(null);
  const [shipmentStatus, setShipmentStatus] = useState<string>('Geleverd');
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Handle back navigation
  const handleBack = () => {
    router.navigate("/(tabs)/scan");
    return true; // Prevents default back behavior
  };

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress', 
      handleBack
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const id = Array.isArray(qrData) ? qrData[0] : qrData;
        const res = await fetch(`http://192.168.1.198:5070/api/shipments/${id}`);
        const data = await res.json();
        setShipment(data);
        setShipmentStatus(data.status);
      } catch (err) {
        console.error('Fout bij ophalen van zending:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [qrData]);

  const updateStatus = (newStatus: string) => {
    setShipmentStatus(newStatus);
    setStatusModalVisible(false);
    // TODO: PUT to backend
  };

  // Loading / placeholder state
  if (loading) {
    return (
      <LinearGradient
        colors={['#17144F', '#090723']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size="large" color="#A970FF" />
        <Text style={{ color: theme.text, marginTop: hp(2) }}>Laden...</Text>
      </LinearGradient>
    );
  }

  if (!shipment) {
    return (
      <LinearGradient
        colors={['#17144F', '#090723']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ color: theme.text }}>Zending niet gevonden</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#17144F', '#090723']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: wp(6),
        paddingTop: hp(6),
      }}
    >
      <StatusBar hidden />

      {/* ✅ Success icon + text */}
      <Image
        source={icons.checked}
        style={{ width: wp(20), height: wp(20), alignSelf: 'center', marginBottom: hp(1.5) }}
      />
      <Text style={{
        color: '#10B981',
        fontSize: wp(6),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp(4),
      }}>
        Succesvol gescand
      </Text>

      {/* 📦 Details card */}
      <LinearGradient
        colors={[theme.cardBg, '#13112D']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          width: '100%',
          padding: wp(5),
          borderRadius: wp(5),
          marginBottom: hp(3),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10,
          borderWidth: 1,
          borderColor: darkMode ? '#2D2A5A' : '#ddd',
        }}
      >
        <Text style={{ color: theme.text, fontSize: wp(5), fontWeight: 'bold', marginBottom: hp(2) }}>
          Zendingdetails
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: wp(4.2), marginBottom: hp(0.5) }}>
          🚚 Status: <Text style={{ color: "#FACC15" }}>{shipmentStatus}</Text>
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: wp(4.2), marginBottom: hp(0.5) }}>
          📍 Bestemming: <Text style={{ color: "#60A5FA" }}>{shipment.destination}</Text>
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: wp(4.2), marginBottom: hp(0.5) }}>
          ⏳ Verwachte leveringtijd: <Text style={{ color: "#C084FC" }}>{shipment.expectedDelivery}</Text>
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: wp(4.2) }}>
          ⚖️ Gewicht: <Text style={{ color: "#F87171" }}>{shipment.weight}</Text>
        </Text>
      </LinearGradient>

      {/* 📦 "Status wijzigen" */}
      <TouchableOpacity
        onPress={() => setStatusModalVisible(true)}
        style={{
          width: '100%',
          padding: wp(5),
          borderRadius: wp(5),
          backgroundColor: theme.cardBg,
          marginBottom: hp(3),
          alignItems: 'center'
        }}
      >
        <Text style={{ color: theme.text, fontSize: wp(4.5), fontWeight: 'bold' }}>
          📦 Status wijzigen
        </Text>
      </TouchableOpacity>

      {/* 🚨 & 🔍 buttons */}
      <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity
          onPress={() =>
            router.push(`/shipment/reportissue?shipmentId=${shipment.id}`)
          }
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
        >
          <Image source={icons.issue} style={{ width: wp(10), height: wp(10), marginBottom: hp(1) }} />
          <Text style={{ color: '#fff', fontSize: wp(3.8), fontWeight: '600' }}>
            Probleem melden
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/scan")}
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
        >
          <Image
            source={icons.qrcode}
            style={{ width: wp(9), height: wp(9), tintColor: "#fff", marginBottom: hp(1) }}
          />
          <Text style={{ color: '#fff', fontSize: wp(3.8), fontWeight: '600' }}>
            Volgende scannen
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🧊 Status Modal */}
      <Modal
        isVisible={statusModalVisible}
        onBackdropPress={() => setStatusModalVisible(false)}
        style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
      >
        <View style={{
          backgroundColor: theme.cardBg,
          width: '85%',
          padding: wp(6),
          borderRadius: wp(5),
        }}>
          <Text style={{
            color: theme.text,
            fontSize: wp(5),
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: hp(2),
          }}>
            📦 Kies nieuwe status
          </Text>
          {["Onderweg","Geleverd","Vertraagd"].map(option => (
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