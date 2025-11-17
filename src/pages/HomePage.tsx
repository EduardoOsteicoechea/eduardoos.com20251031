import "./page.css"
import "./home_page.css"
import { Link } from "react-router-dom"

export default function HomePage() {
   return (
      <div className="page">
         <div className="background_image">
            <img src="/images/personal_photo_1000x500px.jpg" alt="Personal Photo" height="110%" />
         </div>

         <div className="pitch_container">
            <div className="pitch_text">
               <h1>Eduardo Osteicoechea</h1>
               <p><span className="key_idea">Full Stack</span> Desktop/Web<span className="key_idea">Developer</span>, <br /><span className="key_idea">BIM Architect</span> - and<br /><span className="key_idea">UI/UX designer</span>, with a strong focus on the AEC industry and AI Integrations.</p>
               <Link className="action_button" to="/ai_assistant">Talk To My AI Assistant</Link>
            </div>
         </div>

      </div>
   )
}