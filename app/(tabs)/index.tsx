import { icons } from "@/constants/icons";
import { Text, View, Image } from "react-native";

export default function Index() {
  return (
          <View className="bg-primary flex-1 px-10">
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
