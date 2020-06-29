import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../contexts/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    트리픽
                </NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/u1/places">나의 여행지</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">여행지 공유하기</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">로그인</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>로그아웃</button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
