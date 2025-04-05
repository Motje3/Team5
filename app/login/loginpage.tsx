import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons"; // Assuming you have a login icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Fout", "Vul alstublieft zowel e-mail als wachtwoord in.");
      return;
    }
    router.replace("/");
    // if (password != password) {
    //   Alert.alert("Fout", "Wachtwoord incorrect");
    //   return;
    // }
  };

  const handleForgotPassword = () => {
    router.replace("/login/forgotpassword");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="bg-primary flex-1">
              {/* Curved Top Header */}
              <View style={{
                  backgroundColor: "#3E1F92",
                  height: 110,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
              }}>
                  <Text className="text-white text-xl font-bold mt-6">Login</Text>
              </View>

            <View className="items-center mb-12">
              <Image source={icons.user} style={{ width: 60, height: 60, tintColor: "#fff", marginTop: 40 }} />
              <Text className="text-white text-2xl font-bold mt-4">Welkom</Text>
            </View>

            <View>
              <Text className="text-white mb-2">E-mailadres</Text>
              <TextInput
                placeholder="jouwemail@email.com"
                placeholderTextColor="#A8A8A8"
                value={email}
                onChangeText={setEmail}
                className="bg-[#1E1B33] text-white px-4 py-3 rounded-lg mb-4"
              />

              <Text className="text-white mb-2">Wachtwoord</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#A8A8A8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="bg-[#1E1B33] text-white px-4 py-3 rounded-lg mb-6"
              />

              <TouchableOpacity 
                onPress={handleForgotPassword}
                className="self-end mb-6"
              >
                <Text className="text-purple-300 text-sm font-medium">Wachtwoord vergeten?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                className="bg-purple-600 py-3 rounded-lg items-center"
              >
                <Text className="text-white text-lg font-semibold">Inloggen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

Login.options = {
  headerShown: false,
};
export default Login;
