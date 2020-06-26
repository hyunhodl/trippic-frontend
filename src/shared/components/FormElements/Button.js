import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
    const buttonClassName = `button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
    } ${props.danger && "button--danger"}`;

    if (props.href) {
        return (
            <a className={buttonClassName} href={props.href}>
                {props.children}
            </a>
        );
    }

    if (props.to) {
        return (
            <Link to={props.to} className={buttonClassName}>
                {props.children}
            </Link>
        );
    }

    return (
        <button
            className={buttonClassName}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
