import React, { useState, useEffect } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { Camera } from 'expo-camera';

const Scan = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handler for when a QR/barcode is successfully scanned
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    console.log(`Scanned type: ${type}, data: ${data}`);
    // Open the scanned URL or do something else:
    Linking.openURL(data); 
  };

  // If permission is still loading
  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>Requesting camera permission...</Text>
      </View>
    );
  }

  // If permission is denied
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>No access to camera. Please grant permission.</Text>
      </View>
    );
  }

  // If permission is granted, display the camera
  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
        <Camera 
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} 
            style={{ flex: 1 }} 
        />
      {scanned && (
        <Button
          title="Tap to Scan Again"
          onPress={() => setScanned(false)}
          color="#6200ee" // optional styling
        />
      )}
    </View>
  );
};

export default Scan;
