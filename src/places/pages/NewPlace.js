import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

const NewPlace = (props) => {
    const [formState, inputHandler] = useForm(
        {
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
        false
    );

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
                추가
            </Button>
        </form>
    );
};

export default NewPlace;
