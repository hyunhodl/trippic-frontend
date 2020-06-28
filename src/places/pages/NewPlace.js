import React, { useReducer, useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./NewPlace.css";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };
        default:
            return state;
    }
};

const NewPlace = (props) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
        },
        isValid: false,
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            inputId: id,
            isValid: isValid,
        });
    }, []);

    const placeSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                element="input"
                type="text"
                id="title"
                label="제목"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="제목을 입력하세요"
                onInput={inputHandler}
            />
            <Input
                element="textarea"
                id="description"
                label="내용"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="내용을 입력하세요. (최소 5자 이상)"
                onInput={inputHandler}
            />
            <Input
                element="input"
                id="address"
                label="주소"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="주소를 입력하세요 (최소 5자 이상)"
                onInput={inputHandler}
            />
            <Button
                type="submit"
                onSubmit={placeSubmitHandler}
                disabled={!formState.isValid}
            >
                여행지 추가
            </Button>
        </form>
    );
};

export default NewPlace;
