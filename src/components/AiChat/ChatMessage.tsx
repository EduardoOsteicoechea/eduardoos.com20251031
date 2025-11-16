import { useState } from "react"
import "./chat_user_input.css"

interface ChatUserInputProps {
  handleSubmit: (message: string) => void
}

export default function ChatMessage(props: ChatUserInputProps) {
  

  return (
    <div
          key={props.messageIndex}
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