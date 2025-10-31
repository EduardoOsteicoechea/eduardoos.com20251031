import "./menu_button.css"
import PageMenu from "./PageMenu";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [areBarsRotated, setAreBarsRotated] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev)
  };

  useEffect(() => {
    let timer:any;

    if(isMenuActive){
        setAreBarsRotated(true)
    }else{
      timer = setTimeout(()=>{
        setAreBarsRotated(false)
      },150)
    }

    return () => {
      if(timer){
        clearTimeout(timer);
      }
    }

  }, [isMenuActive]);

  return (
    <>
      <div className={`menu_button ${isMenuActive ? "menu_button_active" : "menu_button_disabled"}`} onClick={toggleMenu}>
        <div className={`menu_button_bar ${isMenuActive ? "menu_button_top_bar_active" : ""} ${areBarsRotated ? "menu_button_top_bar_positioned" : ""}`}></div>
        <div className={`menu_button_bar ${isMenuActive ? "menu_button_bottom_bar_active" : ""} ${areBarsRotated ? "menu_button_bottom_bar_positioned" : ""}`}></div>
      </div>
      <PageMenu active={isMenuActive} />
    </>
  );
}