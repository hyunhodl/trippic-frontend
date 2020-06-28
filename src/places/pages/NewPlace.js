import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./NewPlace.css";

const NewPlace = (props) => {
    const placeSubmitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form className="place-form">
            <Input
                element="input"
                type="text"
                id="title"
                label="제목"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="제목을 입력하세요"
            />
            <Input
                element="textarea"
                id="descriptoin"
                label="내용"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="내용을 입력하세요. (최소 5자 이상)"
            />
            <Input
                element="input"
                id="address"
                label="주소"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="주소를 입력하세요 (최소 5자 이상)"
            />
            <Button
                type="submit"
                onSubmit={placeSubmitHandler}
                disabled={false}
            >
                여행지 추가
            </Button>
        </form>
    );
};

export default NewPlace;
