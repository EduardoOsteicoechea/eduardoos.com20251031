import "./page.css"
import "./home_page.css"

export default function HomePage() {
  return (
      <div className="page">
        <div className="background_image">
          <img src="/images/personal_photo_1000x500px.jpg" alt="Personal Photo" height="100%" />
        </div>
        <div className="pitch_container">
          <div className="pitch_text">

          <h1>Eduardo Osteicoechea</h1>
          <p>I'm a Full Stack - Desktop / Web - Developer and BIM Architect - and UI / UX designer, with a strong focus on the AEC industry and AI Integrations.</p>
          </div>
        </div>
      </div>
  )
}