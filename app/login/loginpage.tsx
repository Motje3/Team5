import { wp, hp } from '../utils/responsive';
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Image,
  Alert, KeyboardAvoidingView, Platform, ScrollView,
  TouchableWithoutFeedback, Keyboard
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { icons } from "@/constants/icons";

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
  };

  const handleForgotPassword = () => {
    router.replace("/login/forgotpassword");
  };

  return (
    <>
      <ExpoStatusBar hidden />

      <SafeAreaView style={{ flex: 1, backgroundColor: "#3E1F92" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ flex: 1, backgroundColor: "#3E1F92", padding: wp(6) }}>
                {/* Header */}
                <View
                  style={{
                    backgroundColor: "#3E1F92",
                    height: hp(9),
                    borderBottomLeftRadius: wp(8),
                    borderBottomRightRadius: wp(8),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: wp(5), fontWeight: "bold", marginTop: hp(1.5) }}>
                    Login
                  </Text>
                </View>

                {/* Logo & Welcome */}
                <View style={{ alignItems: "center", marginBottom: hp(6) }}>
                  <Image
                    source={icons.user}
                    style={{ width: wp(14), height: wp(14), tintColor: "#fff", marginTop: hp(5) }}
                  />
                  <Text style={{ color: "#fff", fontSize: wp(6), fontWeight: "bold", marginTop: hp(2) }}>
                    Welkom
                  </Text>
                </View>

                {/* Form */}
                <View>
                  <Text style={{ color: "#fff", marginBottom: hp(1), fontSize: wp(4) }}>
                    E-mailadres
                  </Text>
                  <TextInput
                    placeholder="jouwemail@email.com"
                    placeholderTextColor="#A8A8A8"
                    value={email}
                    onChangeText={setEmail}
                    style={{
                      backgroundColor: "#1E1B33",
                      color: "#fff",
                      paddingHorizontal: wp(4),
                      paddingVertical: hp(1.5),
                      borderRadius: wp(2),
                      marginBottom: hp(2),
                      fontSize: wp(4),
                    }}
                  />

                  <Text style={{ color: "#fff", marginBottom: hp(1), fontSize: wp(4) }}>
                    Wachtwoord
                  </Text>
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="#A8A8A8"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={{
                      backgroundColor: "#1E1B33",
                      color: "#fff",
                      paddingHorizontal: wp(4),
                      paddingVertical: hp(1.5),
                      borderRadius: wp(2),
                      marginBottom: hp(2.5),
                      fontSize: wp(4),
                    }}
                  />

                  <TouchableOpacity
                    onPress={handleForgotPassword}
                    style={{ alignSelf: "flex-end", marginBottom: hp(2) }}
                  >
                    <Text style={{ color: "#D8B4FE", fontSize: wp(3.5), fontWeight: "500" }}>
                      Wachtwoord vergeten?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                      backgroundColor: "#7C3AED",
                      paddingVertical: hp(1.8),
                      borderRadius: wp(2),
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: wp(4.5), fontWeight: "600" }}>
                      Inloggen
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

Login.options = {
  headerShown: false,
};

export default Login;
