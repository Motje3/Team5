import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { ImageBackground, Image, Text, View } from "react-native";
import { icons } from "@/constants/icons";

const TabIcon = ({ focused, icon, title}: any) => {
    if(focused) {
        return (
            <ImageBackground 
                        source={images.highlight}
                        className="flex flex-row w-full flex-1 min-w-[114px] min-h-[64px] mt-4 justify-center items-center rounded-full overflow-hidden"
                    >
                    <Image 
                        source={icon} 
                        tintColor="#151312" 
                        className="size-6" 
                    />
                    <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        )
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
          <Image source={icon} tintColor="#A8B5DB" className="size-6" />
        </View>
      )
      
}

const _Layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
            width: '100%',
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center'
            },
            tabBarStyle: {
                backgroundColor: '#0f0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 53,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 0,
                borderColor: '#0f0d23',
              }
              
        }}
      
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
                focused={focused}
                icon={icons.home}
                title="Home"
            />
          )
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
            title: 'Scan',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon
                    focused={focused}
                    icon={icons.qrcode}
                    title="Scan"
                />
              )
        }}
        />
        <Tabs.Screen
        name="stats"
        options={{
            title: 'Stats',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon
                    focused={focused}
                    icon={icons.stats}
                    title="Stats"
                />
            )
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon
                    focused={focused}
                    icon={icons.user}
                    title="Profile"
                />
              )
        }}
        />
    </Tabs>
  );
}

export default _Layout;
