import { Link } from "react-router-dom";
import "./main_menu.css"
import "./main_menu_item.css"
import { useState } from "react";

interface MainMenuProps {
  active: boolean
  toggleMenu: ()=>void
}

export default function MainMenu(props: MainMenuProps) {

  const [selectedItem, setSelectedItem] = useState("Home");

  const handleSelected = (selected: string) => {
    setSelectedItem(selected);
    props.toggleMenu();
  }

  return (
    <div className={`main_menu ${props.active ? "main_menu_active" : ""}`}>
      <h2 className="main_menu_heading">Main Menu</h2>
      <div className="main_menu_link_container">
        <MainMenuItem
          to="/"
          heading="Home"
          message="Meet Eduardo Osteicoechea and discover the website."
          image="/images/icon_home.png"
          selectedItem={selectedItem}
          handleSelectedItem={handleSelected}
        />
        <MainMenuItem
          to="/ai_assistant"
          heading="AI Assistant"
          message="Ask anything about my profile, tech stack, background and current focus."
          image="/images/icon_series.png"
          selectedItem={selectedItem}
          handleSelectedItem={handleSelected}
        />
        <MainMenuItem
          to="/series"
          heading="Series"
          message="Read my articles in ethics and biblical teaching and reflexion."
          image="/images/icon_series.png"
          selectedItem={selectedItem}
          handleSelectedItem={handleSelected}
        />
      </div>
    </div>
  )
}

interface MainMenuItemProps {
  to: string
  heading: string,
  message: string,
  image: string,
  selectedItem: string,
  handleSelectedItem: (a: any) => void,
}

function MainMenuItem(props: MainMenuItemProps) {
  return (
    <div className="main_menu_item">
      <div className="main_menu_item_icon_container">
        <img src={props.image} height="100%" />
      </div>
      <div className="main_menu_item_data_card">
        <div className="main_menu_item_data_card_heading_indicator_container">
          <h3 className="main_menu_item_data_card_heading">{props.heading}</h3>
          <div className={`main_menu_item_status_indicator_outer_ring`}>
            <div className={`main_menu_item_status_indicator ${props.selectedItem == props.heading ? "selected" : ""}`}></div>
          </div>
        </div>
        <div className="main_menu_item_data_card_message_button_container">
          <p className="main_menu_item_data_card_message">{props.message}</p>
          <Link to={props.to} className="main_menu_item_data_card_button" onClick={()=>props.handleSelectedItem(props.heading)}>View</Link>
        </div>
      </div>
    </div>
  )
}