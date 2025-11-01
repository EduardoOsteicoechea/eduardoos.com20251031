import { Link } from "react-router-dom";
import "./main_menu.css"

interface MainMenuProps {
  active: boolean
}

export default function MainMenu(props: MainMenuProps) {
  return (
    <div className={`main_menu ${props.active ? "main_menu_active" : ""}`}>
      <div className="main_menu_link_container">
        <Link to="/" className="main_menu_main_link">Home</Link>
        <Link to="/series" className="main_menu_main_link">Series</Link>
      </div>
    </div>
  )
}