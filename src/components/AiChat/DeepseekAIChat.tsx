import { useEffect, useState } from "react";
import "./deepseek_ai_chat.css";
import ChatUserInput from "./ChatUserInput";

interface ChatMessage {
  role: string,
  content: string
}

export default function DeepseekAIChat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageSubmit = (message: string) => {
    const newUserMessage: ChatMessage = { role: "user", content: message };
    setChatMessages((prev) => [...prev, newUserMessage]);
  }
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

          const aiResponseData = await response.json();

          console.log(aiResponseData);

          const aiContent = aiResponseData.content;

          if (!aiContent || typeof aiContent !== 'string') {
            console.warn("Response JSON received, but 'content' or 'message' key was missing or not a string.", aiResponseData);
            throw new Error("Received an invalid response format from the server.");
          }

          const newAiMessage: ChatMessage = {
            role: "assistant",
            content: aiContent,
          };
          setChatMessages((prev) => [...prev, newAiMessage]);

        } catch (error) {
          console.error("Failed to fetch AI response:", error);
          const errorResponse: ChatMessage = {
            role: "assistant",
            content: (error as Error).message,
          };
          setChatMessages((prev) => [...prev, errorResponse]);
        } finally {
          setIsLoading(false);
        }
      };

      getAiResponse();
    }
  }, [chatMessages]);

  // useEffect(() => {
  //   if (chatMessages.length === 0) return;

  //   const lastMessage = chatMessages[chatMessages.length - 1];

  //   if (lastMessage.role === 'user') {
  //     const getAiResponse = async () => {
  //       setIsLoading(true);
  //       const requestBody = {
  //         role:"user",
  //         content: lastMessage.content
  //       };
  //       try {
  //         const response = await fetch("https://eduardoos.com/api/profile/assistant", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(requestBody),
  //         });
  //         if (!response.ok) {
  //           throw new Error(`API request failed with status ${response.status}`);
  //         }
  //         const aiTextResponse = await response.json();
  //         const newAiMessage: ChatMessage = {
  //           role: "assistant",
  //           content: aiTextResponse,
  //         };
  //         setChatMessages((prev) => [...prev, newAiMessage]);
  //       } catch (error) {
  //         console.error("Failed to fetch AI response:", error);
  //         const errorResponse: ChatMessage = {
  //           role: "assistant",
  //           content: "Error: " + error
  //         };
  //         setChatMessages((prev) => [...prev, errorResponse]);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     getAiResponse();
  //   }
  // }, [chatMessages]);

  return (
    <div className="ai_chat">
      {chatMessages?.map((message, messageIndex) => (
        <div key={messageIndex}>{message.content}</div>
      ))}

      {isLoading && <div className="chat-message assistant">Assistant is typing...</div>}

      <ChatUserInput
        handleSubmit={handleMessageSubmit}
      />
    </div>
  )
}
