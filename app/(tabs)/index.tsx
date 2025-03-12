import { icons } from "@/constants/icons";
import { Text, View, Image, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View className="bg-primary flex-1 px-10">
      {/* Hide the status bar */}
      <ExpoStatusBar hidden />
      <StatusBar hidden />

      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image 
          source={icons.home} 
          style={{ width: 40, height: 40, tintColor: "#fff" }}
        />
        <Text className="text-gray-500 text-base">Home</Text>
      </View>
    </View>
  );
}
