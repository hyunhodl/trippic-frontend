import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/contexts/auth-context";
import "./Auth.css";

const Auth = (props) => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(
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
        auth.login();
    };

    const switchModeHandler = () => {
        if (isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    return (
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>{isLoginMode ? "로그인" : "회원가입"}</h2>
            <hr />
            <form onSubmit={authenticationHandler}>
                {!isLoginMode && (
                    <Input
                        id="name"
                        label="이름"
                        element="input"
                        type="text"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="이름을 입력하세요."
                    />
                )}
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
                    {isLoginMode ? "로그인" : "회원가입"}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                {isLoginMode ? "회원가입" : "로그인"}하러 가기
            </Button>
        </Card>
    );
};

export default Auth;
