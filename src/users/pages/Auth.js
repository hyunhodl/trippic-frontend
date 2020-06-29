import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./Auth.css";

const Auth = (props) => {
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const authenticationHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <Card className="authentication">
            <h2>로그인</h2>
            <hr />
            <form onSubmit={authenticationHandler}>
                <Input
                    id="email"
                    label="이메일"
                    element="input"
                    type="email"
                    onInput={inputHandler}
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="이메일을 입력하세요."
                />
                <Input
                    id="password"
                    label="비밀번호"
                    element="input"
                    type="password"
                    onInput={inputHandler}
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="비밀번호를 입력하세요. (최소 6자)"
                />
                <Button type="submit" disabled={!formState.isValid}>
                    로그인
                </Button>
            </form>
        </Card>
    );
};

export default Auth;
