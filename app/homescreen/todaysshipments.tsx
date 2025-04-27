import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  BackHandler,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { wp, hp } from '../utils/responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const TodaysShipment = () => {
  const { token } = useAuth();
  const router = useRouter();

  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Back to main tabs
  const handleBack = () => {
    router.replace('/(tabs)');
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => backHandler.remove();
  }, [router]);

  // Fetch all assigned shipments (no date filter)
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await fetch('http://192.168.1.198:5070/api/shipments/me', {
          headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) }
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setShipments(data);
      } catch (e) {
        console.error('Fetch error:', e);
        setError('Kon zendingen niet ophalen');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchShipments(); else setLoading(false);
  }, [token]);

  // Loading & error
  if (loading) {
    return (
      <LinearGradient colors={['#3D0F6E', '#030014']} style={styles.fullscreen}>
        <ActivityIndicator size="large" />
      </LinearGradient>
    );
  }
  if (error) {
    return (
      <LinearGradient colors={['#3D0F6E', '#030014']} style={styles.fullscreen}>
        <Text style={styles.error}>{error}</Text>
      </LinearGradient>
    );
  }

  const total = shipments.length;

  return (
    <LinearGradient colors={['#3D0F6E', '#030014']} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Top Icon and Title */}
      <MaterialCommunityIcons
        name="truck-delivery"
        size={wp(24)}
        color="#A970FF"
        style={{ alignSelf: 'center', marginBottom: hp(1) }}
      />
      <Text style={styles.headerTitle}>Ritten van Vandaag</Text>
      <Text style={styles.subTitle}>Je hebt {total} ritten vandaag</Text>

      {/* List of shipments */}
      <FlatList
        data={shipments}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: hp(4) }}
        renderItem={({ item }) => (
          <LinearGradient
            colors={['#17144F', '#090723']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <Ionicons name="cube-outline" size={wp(8)} color="#60A5FA" />
              <View style={{ marginLeft: wp(4), flex: 1 }}>
                <Text style={styles.cardTitle}>#{item.id}</Text>
                <Text style={styles.cardText}>Bestemming: {item.destination}</Text>
                <Text style={styles.cardText}>Status: {item.status}</Text>
              </View>
              <TouchableOpacity onPress={() => router.push(`http://192.168.1.198:5070/api/shipment/${item.id}`)}>
                <Ionicons name="chevron-forward" size={wp(6)} color="#FFF" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(6)
  },
  headerTitle: {
    color: '#FFF',
    fontSize: wp(6),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(0.5)
  },
  subTitle: {
    color: '#AAA',
    fontSize: wp(4),
    textAlign: 'center',
    marginBottom: hp(3)
  },
  card: {
    padding: wp(4),
    borderRadius: wp(3),
    marginBottom: hp(2),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitle: {
    color: '#FFF',
    fontSize: wp(4.5),
    fontWeight: 'bold'
  },
  cardText: {
    color: '#DDD',
    fontSize: wp(3.5),
    marginTop: hp(0.5)
  },
  error: {
    color: 'white',
    fontSize: wp(4)
  }
});

export default TodaysShipment;
