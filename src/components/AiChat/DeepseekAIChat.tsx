import { useEffect, useState } from "react";
import "./deepseek_ai_chat.css";
import ChatUserInput from "./ChatUserInput";

interface ChatMessage {
  role: string,
  content: string,
  time: string
}

export default function DeepseekAIChat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageSubmit = (message: string) => {
    const newUserMessage: ChatMessage = { role: "user", content: message, time: getCurrentTime() };
    setChatMessages((prev) => [...prev, newUserMessage]);
  }

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (chatMessages.length === 0) return;

    const lastMessage = chatMessages[chatMessages.length - 1];

    if (lastMessage.role === 'user') {
      const getAiResponse = async () => {
        setIsLoading(true);

        const requestBody = {
          messages: chatMessages
        };

        try {

          console.log(requestBody)

          const response = await fetch("https://eduardoos.com/api/profile/assistant", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `API request failed with status ${response.status}`);
          }

          const aiResponseData = await response.text();

          console.log(aiResponseData);

          const aiContent = aiResponseData;

          if (!aiContent || typeof aiContent !== 'string') {
            console.warn("Response JSON received, but 'content' or 'message' key was missing or not a string.", aiResponseData);
            throw new Error("Received an invalid response format from the server.");
          }

          const newAiMessage: ChatMessage = {
            role: "assistant",
            content: aiContent,
            time: getCurrentTime()
          };

          setChatMessages((prev) => [...prev, newAiMessage]);

        } catch (error) {
          console.error("Failed to fetch AI response:", error);
          const errorResponse: ChatMessage = {
            role: "assistant",
            content: (error as Error).message,
            time: getCurrentTime()
          };
          setChatMessages((prev) => [...prev, errorResponse]);
        } finally {
          setIsLoading(false);
        }
      };

      getAiResponse();
    }
  }, [chatMessages]);

  return (
    <div className="ai_chat">

      {chatMessages?.map((message, messageIndex) => (
        <ChatMessage 
        message={message}
        index={messageIndex}
        />
      ))}

      {isLoading && 
      <ChatMessage 
        message={{
            role: "assistant",
            content: "Generating",
            time: getCurrentTime()
          }}
        index={0}
        />}

      <ChatUserInput
        handleSubmit={handleMessageSubmit}
      />
    </div>
  )
}

interface ChatMessageProps{
  message: ChatMessage
  index: number
}

function ChatMessage(props: ChatMessageProps) {
  return (
    <div
          key={props.index}
          className={`ai_chat_message ${props.message.role}`}
        >
          <div className="ai_chat_message_role_and_time_container">
            <p className="ai_chat_message_role">{props.message.role === "user" ? "You" : "Assistant" }</p>
            <p className="ai_chat_message_time">{props.message.time}</p>
          </div>
          {props.message.content}
        </div>
  )
}
