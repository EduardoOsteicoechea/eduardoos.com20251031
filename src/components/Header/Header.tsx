import "./menu_button.css"
import MainMenu from "./MainMenu";
import { useEffect, useState } from "react";
import MenuButton from "./MenuButton";

export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [areBarsRotated, setAreBarsRotated] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev)
  };

  useEffect(() => {
    let timer: any;

    if (isMenuActive) {
      setAreBarsRotated(true)
    } else {
      timer = setTimeout(() => {
        setAreBarsRotated(false)
      }, 200)
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }

  }, [isMenuActive]);

  return (
    <>
      <MenuButton
        isMenuActive={isMenuActive}
        areBarsRotated={areBarsRotated}
        handleClick={toggleMenu}
      />
      <MainMenu 
      active={isMenuActive}
      toggleMenu={toggleMenu}
      />
    </>
  );
}