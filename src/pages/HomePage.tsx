import "./page.css"
import "./home_page.css"
import DeepseekAIChat from "../components/AiChat/DeepseekAIChat"

export default function HomePage() {
   const handleLetsTalkClick = () => {
      // const email = 'eduardooost@gmail.com';
      // const subject = encodeURIComponent("Let's Talk - Project Inquiry");
      // const body = encodeURIComponent("Hi Eduardo,\n\nI came across your portfolio and would like to discuss...");
      // window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      const phoneNumber = '584147281033';
      const message = encodeURIComponent("Hi Eduardo, I came across your portfolio and would like to discuss a project.");
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
   };

   return (
      <div className="page">
         <div className="background_image">
            <img src="/images/personal_photo_1000x500px.jpg" alt="Personal Photo" height="110%" />

            <div className="pitch_container">
               <div className="pitch_text">
                  <h1>Eduardo Osteicoechea</h1>
                  <p>
                     <span className="key_idea">Full Stack</span> Desktop/Web<span className="key_idea">
                        Developer
                     </span>
                     ,
                     <br />
                     <span className="key_idea">
                        BIM Architect
                     </span>
                     - and
                     <br />
                     <span className="key_idea">
                        UI/UX designer
                     </span>
                     , with a strong focus on the AEC industry and AI Integrations.
                  </p>
                  <div className="action_button" onClick={handleLetsTalkClick}>
                     Let's Talk
                  </div>
               </div>
            </div>
         </div>

         <div className="ai_chat_container">
            <DeepseekAIChat />
         </div>
      </div>
   )
}