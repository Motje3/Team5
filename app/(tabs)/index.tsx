import { icons } from "@/constants/icons";
import { images } from "@/constants/images"; // Import background image
import { Text, View, Image, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View className="flex-1">
      {/* Hide the status bar */}
      <ExpoStatusBar hidden />
      <StatusBar hidden />

      {/* Background Image */}
      <Image 
        source={images.bg} 
        style={{
          position: "absolute",
          width: "100%", // Full width
          height: "100%", // Full height
          resizeMode: "cover", // Makes it fit the screen properly
        }} 
      />

    </View>
  );
}
