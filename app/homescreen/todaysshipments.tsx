import { View, Text, TouchableOpacity, StatusBar, FlatList, BackHandler, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { wp, hp } from '../utils/responsive';
import { useApp } from "../context/AppContext";

const Todaysshipment = () => {
  const router = useRouter();
  const { darkMode, accentColor } = useApp();

  const theme = {
    background: darkMode ? "#030014" : "#ffffff",  // Midden volledig zwart of wit
    card: darkMode ? "#111" : "#f2f2f2",
    text: darkMode ? "#ffffff" : "#0f0D23",
    secondaryText: darkMode ? "#9CA3AF" : "#6B7280",
    backIcon: darkMode ? "#ffffff" : "#0f0D23",
  };

  const shipments = [
    { id: "1", title: "Pakket A", date: "2025-04-20" },
    { id: "2", title: "Pakket B", date: "2025-04-19" },
    { id: "3", title: "Pakket C", date: "2025-04-20" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const todaysShipments = shipments.filter((s) => s.date === today);

  const handleBack = () => {
    router.navigate("/(tabs)");
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: wp(6),
        paddingTop: hp(6),
        position: 'relative',
      }}
    >
      {/* StatusBar */}
      <ExpoStatusBar hidden />
      <StatusBar hidden />

      {/* Accentkleur Mist Layer */}
      <LinearGradient
        colors={[
          `${accentColor}aa`, // semi-transparent accent kleur
          'transparent',
          'transparent',
          `${accentColor}aa`
        ]}
        locations={[0, 0.3, 0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <View style={{ flex: 1, zIndex: 1 }}>
        {/* Back Button */}
        <TouchableOpacity 
          onPress={handleBack}
          style={{
            position: 'absolute',
            top: 15,
            left: -15,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Ionicons name="arrow-back" size={30} color={theme.backIcon} />
          <Text style={{ color: theme.text, fontSize: 20, marginLeft: 8 }}>Terug</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={{ marginTop: hp(8), marginBottom: hp(2) }}>
          <Text style={{ color: theme.text, fontSize: wp(6), fontWeight: "bold" }}>
            Zendingen van vandaag
          </Text>
        </View>

        <View style={{ marginBottom: hp(2) }}>
          <Text style={{ color: theme.secondaryText, fontSize: wp(3.5) }}>
            Totale openstaande zendingen vandaag: {todaysShipments.length}
          </Text>
        </View>

        {/* Shipment List */}
        {todaysShipments.length > 0 ? (
          <FlatList
            data={todaysShipments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: theme.card,
                  padding: wp(4),
                  borderRadius: wp(2.5),
                  marginBottom: hp(1.5),
                  shadowColor: darkMode ? accentColor : "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: darkMode ? 0.5 : 0.1,
                  shadowRadius: darkMode ? 6 : 2,
                  elevation: darkMode ? 6: 2,
                }}
              >
                <Text style={{ color: theme.text, fontSize: wp(4.2) }}>{item.title}</Text>
                <Text style={{ color: theme.secondaryText, fontSize: wp(3.2) }}>{item.date}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={{ color: theme.secondaryText, fontSize: wp(3.5) }}>
            Geen zendingen voor vandaag.
          </Text>
        )}
      </View>
    </View>
  );
};

export default Todaysshipment;
