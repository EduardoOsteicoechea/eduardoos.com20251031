import DeepseekAIChat from "../components/AiChat/DeepseekAIChat"
import "./profile_chat_page.css"

export default function ProfileChatPage() {
  return (
    <div className="profile_chat_page">
      <h1>Ask Anything</h1>
      <DeepseekAIChat />
    </div>
  )
}