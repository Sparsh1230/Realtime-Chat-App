import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");

  const joinChat = () => {
    if (!username.trim()) {
      Alert.alert("Username Required", "Please enter a username.");
      return;
    }

    router.push({
      pathname: "/chat",
      params: {
        username: username.trim(),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.logo}>💬</Text>

        <Text style={styles.title}>
          Realtime Chat
        </Text>

        <Text style={styles.subtitle}>
          React Native + Socket.io
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={joinChat}
        >
          <Text style={styles.buttonText}>
            Join Chat
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B93F6",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    elevation: 8,
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 5,
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#0B93F6",
    padding: 16,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});