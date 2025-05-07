"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [teamId, setTeamId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    if (!teamId) return;
    const res = await fetch(`/api/chat/${teamId}/messages`);
    const data = await res.json();
    setMessages(data);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await fetch(`/api/chat/${teamId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newMessage }),
    });
    setNewMessage("");
    fetchMessages();
  };

  useEffect(() => {
    const cookieTeamId = parseInt(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("id_team="))
        ?.split("=")[1] || "0"
    );
    setTeamId(cookieTeamId);
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [teamId]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg: any) => (
          <div key={msg.id_message} className={styles.message}>
            <strong>{msg.user.name}:</strong> {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
