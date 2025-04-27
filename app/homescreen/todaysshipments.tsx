import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  BackHandler,
  StatusBar
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { wp, hp } from '../utils/responsive';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const TodaysShipment = () => {
  const { token } = useAuth();
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Simply exit the screen or go back in your navigation stack
        return false;
      }
    );
    return () => backHandler.remove();
  }, []);

  // Fetch today's shipments for the authenticated user
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch(
          'http://192.168.1.198:5070/api/shipments/me/today',
          {
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setShipments(data);
      } catch (err) {
        console.error('Error fetching today\'s shipments:', err);
        setError('Kon zendingen niet ophalen.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchShipments();
    } else {
      setLoading(false);
      setError('Niet ingelogd');
    }
  }, [token]);

  // Render loading state
  if (loading) {
    return (
      <LinearGradient
        colors={['#3D0F6E', '#030014']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.25 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" />
      </LinearGradient>
    );
  }

  // Render error state
  if (error) {
    return (
      <LinearGradient
        colors={['#3D0F6E', '#030014']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.25 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: wp(6) }}
      >
        <Text style={{ color: 'white', fontSize: wp(4) }}>{error}</Text>
      </LinearGradient>
    );
  }

  const total = shipments.length;

  return (
    <LinearGradient
      colors={['#3D0F6E', '#030014']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.25 }}
      style={{ flex: 1, paddingHorizontal: wp(6), paddingTop: hp(6) }}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />


      {/* Header */}
      <View style={{ marginBottom: hp(2) }}>
        <Text style={{ color: 'white', fontSize: wp(6), fontWeight: 'bold' }}>
          Zendingen van vandaag
        </Text>
        <Text style={{ color: 'gray', fontSize: wp(3.5) }}>
          Totale openstaande zendingen vandaag: {total}
        </Text>
      </View>

      {/* Shipments list */}
      {total > 0 ? (
        <FlatList
          data={shipments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LinearGradient
              colors={['#17144F', '#090723']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: wp(4),
                borderRadius: wp(2.5),
                marginBottom: hp(1.5),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 8,
              }}
            >
              <Text style={{ color: 'white', fontSize: wp(4.2), marginBottom: hp(0.5) }}>
                #{item.id} — {item.status}
              </Text>
              <Text style={{ color: 'gray', fontSize: wp(3.2) }}>
                Bestemming: {item.destination}
              </Text>
            </LinearGradient>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={{ color: 'gray', fontSize: wp(3.5) }}>
          Geen zendingen voor vandaag.
        </Text>
      )}
    </LinearGradient>
  );
};

export default TodaysShipment;
