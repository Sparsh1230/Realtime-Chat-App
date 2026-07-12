import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import API from "../api/api";
import socket from "../socket/socket";
import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";
import { Message } from "../types/Message";

export default function ChatScreen() {
  const { username } = useLocalSearchParams<{
    username: string;
  }>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    loadMessages();

    socket.emit("join", username);

    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("typing", (user: string) => {
      setTypingUser(user);

      setTimeout(() => {
        setTypingUser("");
      }, 1500);
    });

    socket.on("stopTyping", () => {
      setTypingUser("");
    });

    socket.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("onlineUsers");
    };
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  }, [messages]);

  const loadMessages = async () => {
    try {
      const res = await API.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await API.post("/messages", {
        username,
        message,
      });

      socket.emit("stopTyping");

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#0B93F6"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          💬 Realtime Chat
        </Text>

        <Text style={styles.subtitle}>
          {username}
        </Text>

        <Text style={styles.online}>
          🟢 {onlineUsers.length} Online
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ChatBubble
            item={item}
            currentUser={username}
          />
        )}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>💬</Text>

            <Text style={styles.emptyTitle}>
              No Messages
            </Text>

            <Text style={styles.emptySubtitle}>
              Start chatting!
            </Text>
          </View>
        }
      />

      {typingUser !== "" && (
        <Text style={styles.typing}>
          ✍️ {typingUser} is typing...
        </Text>
      )}

      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <MessageInput
          value={message}
          onChangeText={setMessage}
          onSend={sendMessage}
          onTyping={() =>
            socket.emit("typing", username)
          }
          onStopTyping={() =>
            socket.emit("stopTyping")
          }
        />
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#0B93F6",
    padding: 18,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#DCEEFF",
    marginTop: 4,
  },

  online: {
    color: "#FFFFFF",
    marginTop: 8,
    fontWeight: "600",
  },

  typing: {
    marginLeft: 20,
    marginBottom: 5,
    color: "#666",
    fontStyle: "italic",
  },

  empty: {
    alignItems: "center",
    marginTop: 120,
  },

  emptyEmoji: {
    fontSize: 70,
  },

  emptyTitle: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 22,
  },

  emptySubtitle: {
    color: "#777",
    marginTop: 8,
  },
});