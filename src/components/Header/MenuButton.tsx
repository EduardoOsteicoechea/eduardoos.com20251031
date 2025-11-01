import "./menu_button.css"

interface MenuButtonProps {
  isMenuActive: boolean,
  areBarsRotated: boolean,
  handleClick: () => void,
}

export default function MenuButton({ isMenuActive, areBarsRotated, handleClick }: MenuButtonProps) {

  return (
    <div className={`menu_button ${isMenuActive ? "menu_button_active" : "menu_button_disabled"}`} onClick={handleClick}>
      <div className={`menu_button_bar ${isMenuActive ? "menu_button_top_bar_active" : ""} ${areBarsRotated ? "menu_button_top_bar_positioned" : ""}`}></div>
      <div className={`menu_button_bar ${isMenuActive ? "menu_button_bottom_bar_active" : ""} ${areBarsRotated ? "menu_button_bottom_bar_positioned" : ""}`}></div>
    </div>
  );
}