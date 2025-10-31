import { Link } from "react-router-dom";
import "./page_menu.css"

interface PageMenuProps {
  active: boolean
}

export default function PageMenu(props: PageMenuProps) {
  return (
    <div className={`page_menu ${props.active ? "active" : "disabled"}`}>
      <Link to="/" >Home</Link>
      <Link to="/series" >Series</Link>
    </div>
  )
}