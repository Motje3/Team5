import React, { useState } from "react";
import { View, Text, Image, FlatList, Dimensions, StyleSheet } from "react-native";
import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import DatePickerFilter from "../filters/DatePickerFilter";
import LocationFilter from "../filters/LocationFilter";

const { width } = Dimensions.get("window"); // Get screen width for consistent sizing

const Stats = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  // Dummy shipment stats
  const shipmentStats = {
    total: 124, // Total processed shipments
    completed: 98, // Successfully completed
    pending: 26, // Still in transit
  };

  // Dummy shipment data
  const shipments = [
    { id: "SHIP-101", location: "Amsterdam", status: "Afgerond", date: "2025-04-20" },
    { id: "SHIP-102", location: "Rotterdam", status: "In afwachting", date: "2025-04-21" },
    { id: "SHIP-103", location: "Utrecht", status: "Afgerond", date: "2025-04-20" },
    { id: "SHIP-104", location: "Amsterdam", status: "In afwachting", date: "2025-04-22" },
    { id: "SHIP-105", location: "Rotterdam", status: "Afgerond", date: "2025-04-21" },
    { id: "SHIP-106", location: "Utrecht", status: "In afwachting", date: "2025-04-23" },
    { id: "SHIP-107", location: "Amsterdam", status: "Afgerond", date: "2025-04-22" },
    { id: "SHIP-108", location: "Rotterdam", status: "In afwachting", date: "2025-04-24" },
    { id: "SHIP-109", location: "Utrecht", status: "Afgerond", date: "2025-04-23" },
    { id: "SHIP-110", location: "Amsterdam", status: "In afwachting", date: "2025-04-25" },
  ];

  // Filter logic
  const filteredShipments = shipments.filter((shipment) => {
    const matchesLocation = location
      ? shipment.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesDate = date ? shipment.date === date : true;
    return matchesLocation && matchesDate;
  });

  return (
    <LinearGradient
      colors={["#3D0F6E", "#030014"]} // Updated background gradient to match index.tsx
      locations={[0, 0.7, 1]} // Smooth transition
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {/* Page Header */}
      <View style={styles.header}>
        <Image source={icons.stats} style={styles.headerIcon} />
      </View>

      {/* Shipment Overview */}
      <LinearGradient
        colors={["#17144F", "#090723"]} // Original box gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overviewBox}
      >
        <Text style={styles.overviewTitle}>Jouw zendingen</Text>
        <View style={styles.overviewStats}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{shipmentStats.total}</Text>
            <Text style={styles.statLabel}>Totaal</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValueCompleted}>{shipmentStats.completed}</Text>
            <Text style={styles.statLabel}>Voltooid</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValuePending}>{shipmentStats.pending}</Text>
            <Text style={styles.statLabel}>In behandeling</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Recent Activity */}
      <LinearGradient
        colors={["#17144F", "#090723"]} // Original box gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.activityBox}
      >
        <Text style={styles.activityTitle}>Recente activiteit</Text>

        {/* Scrollable Shipment List */}
        <View style={styles.scrollableList}>
          <FlatList
            data={filteredShipments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemId}>{item.id}</Text>
                <Text
                  style={[
                    styles.listItemStatus,
                    { color: item.status === "Afgerond" ? "#22C55E" : "#FACC15" },
                  ]}
                >
                  {item.status}
                </Text>
                <Text style={styles.listItemDate}>{item.date}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </LinearGradient>

      {/* Filters */}
      <LinearGradient
        colors={["#17144F", "#090723"]} // Original box gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.filterBox}
      >
        <Text style={styles.filterTitle}>Filters</Text>
        <View style={styles.filterItem}>
          <LocationFilter label="Location" value={location} onChange={setLocation} />
        </View>
        <View>
          <DatePickerFilter label="Date" value={date} onChange={setDate} />
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    width: 30,
    height: 30,
    tintColor: "#A970FF",
    marginTop: 20,
  },
  overviewBox: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 15,
    width: width * 0.9, // Consistent width
    alignSelf: "center",
  },
  overviewTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overviewStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    color: "#A970FF",
    fontSize: 24,
    fontWeight: "bold",
  },
  statValueCompleted: {
    color: "#22C55E",
    fontSize: 24,
    fontWeight: "bold",
  },
  statValuePending: {
    color: "#FACC15",
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#AAA",
    fontSize: 14,
  },
  activityBox: {
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 15,
    width: width * 0.9, // Consistent width
    alignSelf: "center",
  },
  activityTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollableList: {
    maxHeight: 200, // Fixed height for scrollable list
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  listItemId: {
    color: "#AAA",
    fontSize: 14,
  },
  listItemStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemDate: {
    color: "#666",
    fontSize: 14,
  },
  filterBox: {
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    width: width * 0.9, // Consistent width
    alignSelf: "center",
  },
  filterTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterItem: {
    marginBottom: 10,
  },
});

export default Stats;