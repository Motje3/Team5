import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";

interface DatePickerFilterProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

const DatePickerFilter: React.FC<DatePickerFilterProps> = ({ label, value, onChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateConfirm = (selectedDate: Date) => {
    setIsDatePickerOpen(false);
    onChange(selectedDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
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
        onPress={() => setIsDatePickerOpen(true)}
      >
        <Text style={{ color: "#FFF" }}>{value || `Select ${label.toLowerCase()}`}</Text>
      </TouchableOpacity>
      {isDatePickerOpen && (
        <DatePicker
          modal
          open={isDatePickerOpen}
          date={value ? new Date(value) : new Date()}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setIsDatePickerOpen(false)}
        />
      )}
    </View>
  );
};

export default DatePickerFilter;