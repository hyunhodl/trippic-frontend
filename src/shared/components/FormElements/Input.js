import React, { useReducer } from "react";

import { validate } from "../../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                value: action.value,
                isValid: validate(action.value, action.validators),
            };
        default:
            return state;
    }
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: "",
        isValid: false,
    });

    const inputChangeHandler = (event) => {
        dispatch({
            type: "CHANGE",
            value: event.target.value,
            validators: props.validators,
        });
    };

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                value={inputState.value}
                onChange={inputChangeHandler}
                placeholder={props.placeholder}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                value={inputState.value}
                onChange={inputChangeHandler}
            ></textarea>
        );

    return (
        <div
            className={`form-control ${
                !inputState.isValid && "form-control--invalid"
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
