import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Message } from "../types/Message";

interface Props {
  item: Message;
  currentUser: string;
}

export default function ChatBubble({ item, currentUser }: Props) {
  const isMine = item.username === currentUser;

  return (
    <View
      style={[
        styles.wrapper,
        {
          alignItems: isMine ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View
        style={[
          styles.bubble,
          isMine ? styles.myBubble : styles.otherBubble,
        ]}
      >
        {!isMine && (
          <Text style={styles.username}>
            {item.username}
          </Text>
        )}

        <Text
          style={[
            styles.message,
            {
              color: isMine ? "#fff" : "#111",
            },
          ]}
        >
          {item.message}
        </Text>

        <Text
          style={[
            styles.time,
            {
              color: isMine ? "#d8ecff" : "#777",
            },
          ]}
        >
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    marginVertical: 5,
  },

  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    elevation: 2,
  },

  myBubble: {
    backgroundColor: "#0B93F6",
    borderBottomRightRadius: 4,
  },

  otherBubble: {
    backgroundColor: "#ECECEC",
    borderBottomLeftRadius: 4,
  },

  username: {
    fontWeight: "700",
    color: "#444",
    marginBottom: 5,
  },

  message: {
    fontSize: 16,
    lineHeight: 22,
  },

  time: {
    marginTop: 6,
    alignSelf: "flex-end",
    fontSize: 11,
  },
});