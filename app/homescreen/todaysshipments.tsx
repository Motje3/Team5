import { View, Text, Image, TouchableOpacity, StatusBar, FlatList } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { wp, hp } from '../utils/responsive';

const Todaysshipment = () => {
  const router = useRouter();

  // Test data
  const shipments = [
    { id: "1", title: "Pakket A", date: "2025-04-20" },
    { id: "2", title: "Pakket B", date: "2025-04-19" },
    { id: "3", title: "Pakket C", date: "2025-04-20" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const todaysShipments = shipments.filter((s) => s.date === today);

  return (
    <LinearGradient
      colors={["#3D0F6E", "#030014"]}
      locations={[0, 0.7, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.25 }}
      style={{
        flex: 1,
        paddingHorizontal: wp(6),
        paddingTop: hp(6),
      }}
    >
      <ExpoStatusBar hidden />
      <StatusBar hidden />

      {/* Back button */}
      <View>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: hp(1),
            left: -wp(3),
            zIndex: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back" size={wp(7)} color="white" />
          <Text style={{ color: "white", fontSize: wp(4.5), marginLeft: wp(2) }}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Titel */}
      <View style={{ marginTop: hp(8), marginBottom: hp(2) }}>
        <Text style={{ color: "#fff", fontSize: wp(6), fontWeight: "bold" }}>
          Zendingen van vandaag
        </Text>
      </View>

      <View style={{ marginBottom: hp(2) }}>
        <Text style={{ color: "gray", fontSize: wp(3.5) }}>
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
                backgroundColor: "#111",
                padding: wp(4),
                borderRadius: wp(2.5),
                marginBottom: hp(1.5),
              }}
            >
              <Text style={{ color: "white", fontSize: wp(4.2) }}>{item.title}</Text>
              <Text style={{ color: "gray", fontSize: wp(3.2) }}>{item.date}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={{ color: "gray", fontSize: wp(3.5) }}>Geen zendingen voor vandaag.</Text>
      )}
    </LinearGradient>
  );
};

export default Todaysshipment;
