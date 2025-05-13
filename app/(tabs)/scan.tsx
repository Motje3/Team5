import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  AppState,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { wp, hp } from "../utils/responsive";

const Scan = () => {
  const { darkMode } = useApp();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const appState = useRef(AppState.currentState);
  const qrLock = useRef(false);
  // lege var voor camera
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    const initializeCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
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
        // flashMode={torchOn ? 'torch' : 'off'}
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(() => {
              router.push(`/shipment/shipmentdetails?qrData=${encodeURIComponent(data)}`);
            }, 500);
          }
        }}
      />


      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={styles.scanArea} />
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay} />
      </View>

      {/* Top Buttons */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={wp(8)} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTorchOn((prev) => !prev)}>
          <Ionicons
            name={torchOn ? "flashlight" : "flashlight-outline"}
            size={wp(8)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const boxSize = wp(75);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    position: "relative",
  },
  infoText: {
    color: "#fff",
    fontSize: wp(4),
    textAlign: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  topOverlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  middleRow: {
    flexDirection: "row",
  },
  sideOverlay: {
    width: (wp(100) - boxSize) / 2,
    height: boxSize,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scanArea: {
    width: boxSize,
    height: boxSize,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: wp(0),
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  bottomOverlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  topBar: {
    position: "absolute",
    top: Platform.OS === "ios" ? hp(6) : hp(3),
    left: wp(4),
    right: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Scan;
