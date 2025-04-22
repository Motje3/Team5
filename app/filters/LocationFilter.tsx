import React from "react";
import { View, Text, TextInput } from "react-native";

interface LocationFilterProps {
  label: string;
  value: string;
  onChange: (location: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ label, value, onChange }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: "#FFF", marginBottom: 8 }}>{label}</Text>
      <TextInput
        style={{
          backgroundColor: "#1E1E1E",
          color: "#FFF",
          padding: 8,
          borderRadius: 8,
        }}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default LocationFilter;