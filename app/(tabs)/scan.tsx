import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, AppState } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { useIsFocused } from '@react-navigation/native';
import { wp, hp } from '../utils/responsive'; // ✅ Responsive helpers

const Scan = () => {
  const { darkMode } = useApp();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const appState = useRef(AppState.currentState);
  const qrLock = useRef(false);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    const initializeCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    initializeCamera();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        qrLock.current = false;
        initializeCamera();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [darkMode, isFocused]);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Camera toestemming wordt aangevraagd...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Geen toegang tot de camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(() => {
              router.push(`/shipment/shipmentdetails?qrData=${encodeURIComponent(data)}`);
            }, 500);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  infoText: {
    color: '#fff',
    fontSize: wp(4),
    textAlign: 'center',
  },
});

export default Scan;
