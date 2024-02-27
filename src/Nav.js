import React, { useEffect, useState } from "react";
import "./Nav.css";
import Avatar from "./Resources/avatar.jpg";
import Netflix_logo from "./Resources/Netflix_logo.jpg";
function Nav() {
  let [show, setShow] = useState(false);
  useEffect(() => {
    let scrollHandler = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={Netflix_logo} alt="Netflix Logo" />
      <img className="nav__avatar" src={Avatar} alt="Avator Logo" />
    </div>
  );
}

export default Nav;
