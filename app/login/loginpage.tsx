import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { wp, hp } from "../utils/responsive";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  // block back
  useEffect(() => {
    const backAction = () => true;
    const sub = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => sub.remove();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Fout", "Vul alstublieft gebruikersnaam en wachtwoord in.");
      return;
    }
    try {
      await login(username, password);
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Login fout", err.message || "Onbekende fout");
    }
  };

  return (
    <LinearGradient
      colors={["#3E1F92", "#230F52"]}
      locations={[0.3, 1]}
      style={styles.background}
    >
      <ExpoStatusBar hidden />
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/* Logo at top */}
              <Image source={images.logo} style={styles.logo} />

              {/* Title and subtitle */}
              <Text style={styles.title}>Welkom bij E.Lafeber</Text>
              <Text style={styles.subtitle}>Industriële verhuizing</Text>

              {/* Inputs */}
              <View style={styles.form}>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="person-outline"
                    size={wp(5)}
                    color="#A8A8A8"
                  />
                  <TextInput
                    placeholder="Gebruikersnaam"
                    placeholderTextColor="#A8A8A8"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={wp(5)}
                    color="#A8A8A8"
                  />
                  <TextInput
                    placeholder="Wachtwoord"
                    placeholderTextColor="#A8A8A8"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={wp(5)}
                      color="#A8A8A8"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginText}>INLOGGEN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/login/forgotpassword')}>
                  <Text style={styles.forgot}>Wachtwoord vergeten?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
    justifyContent: "flex-start", // align content to top
  },
  logo: {
    width: wp(60),
    height: wp(60),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: hp(10), // position near top
    marginBottom: hp(2),
    opacity: 1,
  },
  title: {
    color: "#fff",
    fontSize: wp(8),
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#DDD",
    fontSize: wp(3.5),
    textAlign: "center",
    marginBottom: hp(4),
  },
  form: {
    marginTop: hp(2),
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1B33",
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: hp(1.5),
    marginLeft: wp(2),
  },
  loginButton: {
    backgroundColor: "#A970FF",
    paddingVertical: hp(2),
    borderRadius: wp(2),
    alignItems: "center",
    marginBottom: hp(2),
  },
  loginText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontWeight: "600",
  },
  forgot: {
    color: "#D8B4FE",
    fontSize: wp(3.5),
    textAlign: "center",
  },
});

Login.options = { headerShown: false };
export default Login;
