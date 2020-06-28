import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                value: action.value,
                isValid: validate(action.value, action.validators),
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: "",
        isValid: false,
        isTouched: false,
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, onInput, value, isValid]);

    const inputChangeHandler = (event) => {
        dispatch({
            type: "CHANGE",
            value: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({
            type: "TOUCH",
        });
    };

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                value={inputState.value}
                onChange={inputChangeHandler}
                onBlur={touchHandler}
                placeholder={props.placeholder}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                value={inputState.value}
                onChange={inputChangeHandler}
                onBlur={touchHandler}
            ></textarea>
        );

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                "form-control--invalid"
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <p>{props.errorText}</p>
            )}
        </div>
    );
};

export default Input;
