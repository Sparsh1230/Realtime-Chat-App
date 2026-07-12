import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onTyping?: () => void;
  onStopTyping?: () => void;
}

export default function MessageInput({
  value,
  onChangeText,
  onSend,
  onTyping,
  onStopTyping,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type a message..."
        value={value}
        onChangeText={(text) => {
          onChangeText(text);

          if (text.length > 0) {
            onTyping?.();
          } else {
            onStopTyping?.();
          }
        }}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onSend}
      >
        <Text style={styles.buttonText}>➜</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ECECEC",
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },

  button: {
    width: 52,
    height: 52,
    marginLeft: 10,
    backgroundColor: "#0B93F6",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});