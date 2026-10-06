import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signInWithEmail, isLoading } = useAuthStore();

  async function handleSignIn() {
    try {
      await signInWithEmail(email, password);
      if (!isLoading) {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      Alert.alert("Sign-in Error", error.message);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.brand}>HIDE & SEEK</Text>
        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in and get back to the game.</Text>

        <View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              accessibilityLabel="Email"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#A3A3A3"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              accessibilityLabel="Password"
              placeholderTextColor="#A3A3A3"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.disabled]}
            onPress={handleSignIn}
            disabled={isLoading}
            accessibilityRole="button"
          >
            <Text style={styles.loginText}>
              {isLoading ? "Signing in…" : "Sign in"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OTHER SIGN-IN OPTIONS</Text>
          <View style={styles.line} />
        </View>

        <View>
          <TouchableOpacity
            style={[styles.oauthButton, styles.disabled]}
            disabled
            accessibilityRole="button"
            accessibilityState={{ disabled: true }}
          >
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Text style={styles.oauthText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.oauthButton, styles.disabled]}
            disabled
            accessibilityRole="button"
            accessibilityState={{ disabled: true }}
          >
            <AntDesign name="apple1" size={20} color="white" />
            <Text style={styles.oauthText}>Continue with Apple</Text>
          </TouchableOpacity>
          <Text style={styles.notice}>
            Google and Apple sign-in are not supported yet. Please use your
            email and password.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity
            accessibilityRole="link"
            onPress={() => router.replace("/(auth)/signup")}
          >
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#101214" },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  card: {
    width: "100%",
    maxWidth: 440,
    backgroundColor: "#191c20",
    borderWidth: 1,
    borderColor: "#30343b",
    borderRadius: 24,
    padding: 28,
  },
  brand: {
    color: "#79acff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 18,
  },
  heading: {
    color: "#f7f7f8",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#a7a9ac",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },
  label: { color: "#d2d3d5", fontSize: 13, fontWeight: "600", marginBottom: 8 },
  input: {
    width: "100%",
    backgroundColor: "#101214",
    color: "#f7f7f8",
    borderWidth: 1,
    borderColor: "#3b3e40",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#0f6ef7",
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  loginText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 26 },
  line: { flex: 1, height: 1, backgroundColor: "#3b3e40" },
  dividerText: {
    color: "#a7a9ac",
    fontSize: 10,
    letterSpacing: 1,
    marginHorizontal: 12,
  },
  oauthButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#525558",
    borderRadius: 12,
    marginBottom: 10,
  },
  disabled: { opacity: 0.45 },
  oauthText: { color: "#f7f7f8", fontSize: 14, marginLeft: 10 },
  notice: {
    color: "#a7a9ac",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 6,
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginTop: 28,
  },
  footerText: { color: "#a7a9ac", fontSize: 14 },
  signupText: { color: "#79acff", fontSize: 14, fontWeight: "600" },
});
