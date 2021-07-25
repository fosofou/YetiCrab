import React from "react";
import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () =>{
    
    const histoty = useHistory()
    const auth = useContext(AuthContext);

    const logoutHandler = (event:React.MouseEvent) =>{
        event.preventDefault();
        auth.logout();
        histoty.push('/');
    }

    
   

    return(
        <nav>
        <div className="nav-wrapper">
      <a href="/create" className="brand-logo promo">Сервис ведения заявок для логистов</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down navigation">
        <li><NavLink to= "/transport" >Добавить заявку</NavLink></li>
        <li><a href = '/' onClick = {logoutHandler}>Выйти</a></li>
      </ul>
    </div>
    </nav>
    )
}