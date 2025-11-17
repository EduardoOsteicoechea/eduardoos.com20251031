import { useState } from "react"
import "./chat_user_input.css"

interface ChatUserInputProps {
  handleSubmit: (message: string) => void
}

export default function ChatUserInput({ handleSubmit }: ChatUserInputProps) {
  const [message, setMessage] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleSendClick = () => {
    handleSubmit(message);
    setMessage("");
  }

  return (
    <div className="chat_user_input">
      <textarea
        className="chat_user_input_input"
        onInput={handleInput}
        value={message}
        placeholder="Write your question here..."
      ></textarea>
      <button className="chat_user_input_submit_button" onClick={handleSendClick}>Send</button>
    </div>
  )
}