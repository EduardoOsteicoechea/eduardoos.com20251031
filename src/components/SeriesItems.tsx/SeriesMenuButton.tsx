import "./series_menu_button.css"

interface MenuButtonProps {
  isMenuActive: boolean,
  areBarsRotated: boolean,
  handleClick: () => void,
}

export default function SeriesMenuButton({ isMenuActive, areBarsRotated, handleClick }: MenuButtonProps) {

  return (
    <div className={`series_menu_button ${isMenuActive ? "series_menu_button_active" : "series_menu_button_disabled"}`} onClick={handleClick}>
      <div className={`series_menu_button_bar ${isMenuActive ? "series_menu_button_top_bar_active" : ""} ${areBarsRotated ? "series_menu_button_top_bar_positioned" : ""}`}></div>
      <div className={`series_menu_button_bar ${isMenuActive ? "series_menu_button_bottom_bar_active" : ""} ${areBarsRotated ? "series_menu_button_bottom_bar_positioned" : ""}`}></div>
    </div>
  );
}