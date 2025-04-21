import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, AppState } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext'; // Import useApp hook
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook

const Scan = () => {
  const { darkMode } = useApp(); // Now this works after importing the context
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const appState = useRef(AppState.currentState);
  const qrLock = useRef(false); // Prevent multiple scans
  const router = useRouter();

  const isFocused = useIsFocused(); // Track if the screen is focused

  useEffect(() => {
    const initializeCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    initializeCamera();  // Initialiseer de camera

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        qrLock.current = false; // Unlock scanning when app is active again
        initializeCamera(); // Reinitialize the camera when app is in foreground
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [darkMode, isFocused]); // Re-run this effect whenever darkMode or screen focus changes

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Camera toestemming wordt aangevraagd...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Geen toegang tot de camera</Text>
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
  },
});

export default Scan;
