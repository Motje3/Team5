import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerFilterProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

const DatePickerFilter: React.FC<DatePickerFilterProps> = ({ label, value, onChange }) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setIsPickerVisible(false);
    if (selectedDate) {
      onChange(selectedDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: "#FFF", marginBottom: 8 }}>{label}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#1E1E1E",
          padding: 8,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={() => setIsPickerVisible(true)}
      >
        <Text style={{ color: "#FFF" }}>{value || `Select ${label.toLowerCase()}`}</Text>
      </TouchableOpacity>
      {isPickerVisible && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePickerFilter;