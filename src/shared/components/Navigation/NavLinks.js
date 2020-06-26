import React from "react";

import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    트리픽
                </NavLink>
            </li>
            <li>
                <NavLink to="/u1/places">나의 여행지</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">여행지 공유하기</NavLink>
            </li>
            <li>
                <NavLink to="/auth">로그인</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;
