import { Tabs } from "expo-router";

const _Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false
          
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
            title: 'Scan',
            headerShown: false
        }}
        />
        <Tabs.Screen
        name="stats"
        options={{
            title: 'Stats',
            headerShown: false
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
            title: 'Profile',
            headerShown: false
        }}
        />
    </Tabs>
  );
}

export default _Layout;
