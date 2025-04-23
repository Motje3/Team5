import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Dimensions, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import DatePickerFilter from "../filters/DatePickerFilter";
import LocationFilter from "../filters/LocationFilter";

const { width } = Dimensions.get("window");

// Define the Shipment type
interface Shipment {
  id: number;
  status: string;
  destination: string;
  createdAt: string;
}

const Stats = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  const [shipmentStats, setShipmentStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch("http://192.168.1.25:5070/api/Shipments");
        if (!response.ok) {
          throw new Error("Failed to fetch shipments");
        }
        const data = await response.json();
        setShipments(data);

        // Calculate stats
        const total = data.length;
        const completed = data.filter((s: Shipment) => s.status === "Afgerond").length;
        const pending = data.filter((s: Shipment) => s.status === "In afwachting").length;
        setShipmentStats({ total, completed, pending });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const filteredShipments = shipments.filter((shipment) => {
    const matchesLocation = location
      ? shipment.destination.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesDate = date ? shipment.createdAt.split("T")[0] === date : true;
    return matchesLocation && matchesDate;
  });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#A970FF" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#3D0F6E", "#030014"]}
      locations={[0, 0.7, 1]}
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
        colors={["#17144F", "#090723"]}
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
        colors={["#17144F", "#090723"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.activityBox}
      >
        <Text style={styles.activityTitle}>Recente activiteit</Text>
        <View style={styles.scrollableList}>
          <FlatList
            data={filteredShipments}
            keyExtractor={(item) => item.id.toString()}
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
                <Text style={styles.listItemDate}>{item.createdAt.split("T")[0]}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </LinearGradient>

      {/* Filters Button */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.filterButton}
      >
        <View style={styles.filterButtonContent}>
          <Image source={icons.filter} style={styles.filterIcon} />
          <Text style={styles.filterText}>Filter</Text>
        </View>
      </TouchableOpacity>

      {/* Filters Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["#17144F", "#090723"]}
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
              <TouchableOpacity onPress={() => setDate("")} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset Date</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
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
    marginTop: 40,
  },
  filterButton: {
    marginTop: 10,
    alignSelf: "flex-start", // Align to the left
    marginLeft: 20, // Add some spacing from the left
    backgroundColor: "#17144F",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 25,
    borderRadius: 25, // Makes it oval
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  filterButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFF",
    marginRight: 15, // Space between icon and text
  },
  filterText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
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
    width: width * 0.9,
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
    width: width * 0.9,
    alignSelf: "center",
  },
  activityTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollableList: {
    maxHeight: 200,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  filterBox: {
    padding: 20,
    borderRadius: 20,
    width: width * 0.9,
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
  resetButton: {
    marginTop: 10,
    backgroundColor: "#FF4D4D",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Stats;