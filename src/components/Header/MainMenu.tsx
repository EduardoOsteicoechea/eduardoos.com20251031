import { Link, useLocation } from "react-router-dom";
import "./main_menu.css"
import "./main_menu_item.css"

interface MainMenuProps {
   active: boolean
   toggleMenu: () => void
}

export default function MainMenu(props: MainMenuProps) {
   const handleSelected = () => {
      props.toggleMenu();
   }

   return (
      <div className={`main_menu ${props.active ? "main_menu_active" : ""}`}>
         <div className="main_menu_link_container">
            <MainMenuItem
               to="/"
               heading="Home"
               message="Know Eduardo's value proposition and discover the website."
               image="/images/icon_home.png"
               handleSelectedItem={handleSelected}
            />
            <MainMenuItem
               to="/profile"
               heading="Profile"
               message="View my professional background, skills, value proposition and focus."
               image="/images/icon_profile.png"
               handleSelectedItem={handleSelected}
            />
            <MainMenuItem
               to="/series"
               heading="Series"
               message="Read my articles in ethics, biblical teaching and cultural reflexion."
               image="/images/icon_series.png"
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
   // selectedItem: string,
   handleSelectedItem: () => void,
}

function MainMenuItem(props: MainMenuItemProps) {
   const location = useLocation();
   const isSelected = location.pathname === props.to;

   return (
      <div className="main_menu_item">

         <div className={`main_menu_item_icon_container ${isSelected ? "main_menu_item_icon_container_selected" : ""}`}>
            <img src={props.image} height="100%" />
         </div>

         <div className={`main_menu_item_data_card ${isSelected ? "main_menu_item_data_card_selected" : ""}`}>

            <div className="main_menu_item_data_card_heading_indicator_container">
               <h3 className="main_menu_item_data_card_heading">{props.heading}</h3>
               <div className={`main_menu_item_status_indicator_outer_ring ${isSelected ? "main_menu_item_status_indicator_outer_ring_selected" : ""}`}>
                  <div className={`main_menu_item_status_indicator ${isSelected ? "selected" : ""}`}></div>
               </div>
            </div>

            <div className="main_menu_item_data_card_message_button_container">
               <p className={`main_menu_item_data_card_message  $isSelected ? "main_menu_item_data_card_message_selected" : ""}`}>{props.message}</p>
               <Link 
               to={props.to} 
               className={`main_menu_item_data_card_button ${isSelected ? "main_menu_item_data_card_button_selected" : ""}`}
               onClick={() => props.handleSelectedItem()}
               >View</Link>
               {/* <Link to={props.to} className={`main_menu_item_data_card_button  ${props.selectedItem == props.heading ? "main_menu_item_data_card_button_selected" : ""}`} onClick={() => props.handleSelectedItem(props.heading)}>View</Link> */}
            </div>

         </div>

      </div>
   )
}