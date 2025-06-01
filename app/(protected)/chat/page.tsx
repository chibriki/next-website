"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [teamId, setTeamId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const [activeTab, setActiveTab] = useState<"team" | "general">("team");

  const getChatEndpoint = () =>
    activeTab === "general"
      ? `/api/chat/general/messages`
      : `/api/chat/${teamId}/messages`;

  const getTeam = () => (teamId === 1 ? "A" : "B");

  const fetchMessages = async () => {
    if (!teamId && activeTab === "team") return;
    const res = await fetch(getChatEndpoint());
    const data = await res.json();
    setMessages(data);
  };

  const InitialScroll = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await fetch(getChatEndpoint(), {
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
    const cookieUserId = parseInt(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("id_user="))
        ?.split("=")[1] || "0"
    );
    setCurrentUserId(cookieUserId);
  }, []);

  useEffect(() => {
    if (teamId || activeTab === "general") {
      fetchMessages().then(() => {
        if (isInitialLoad.current) {
          setTimeout(() => {
            InitialScroll();
          }, 100);
          isInitialLoad.current = false;
        }
      });
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [teamId, activeTab]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.tabs}>
        <button
          className={activeTab === "team" ? styles.activeTab : styles.tab}
          onClick={() => {
            setActiveTab("team");
            isInitialLoad.current = true;
          }}
        >
          Team Chat {getTeam()}
        </button>
        <button
          className={activeTab === "general" ? styles.activeTab : styles.tab}
          onClick={() => {
            setActiveTab("general");
            isInitialLoad.current = true;
          }}
        >
          General Chat
        </button>
      </div>
      <div className={styles.messages}>
        {messages.map((msg: any) => {
          const timestamp = new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={msg.id_message}
              className={`${styles.messageBubble} ${
                msg.id_user === currentUserId
                  ? styles.ownMessage
                  : styles.otherMessage
              }`}
            >
              <div className={styles.sender}>{msg.user.name}</div>
              <div className={styles.content}>{msg.content}</div>
              <div className={styles.timestamp}>{timestamp}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={scrollToBottom}>Scroll to Bottom</button>
      </div>
    </div>
  );
}
