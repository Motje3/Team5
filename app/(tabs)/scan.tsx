import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons';

const Scan = () => {
  return (
          <View className="bg-primary flex-1 px-10">
              <View className="flex justify-center items-center flex-1 flex-col gap-5">
                  <Image 
                      source={icons.qrcode} 
                      style={{ width: 40, height: 40, tintColor: "#fff" }}
                  />
                  <Text className="text-gray-500 text-base">Scan</Text>
              </View>
          </View>
      );
}

export default Scan
