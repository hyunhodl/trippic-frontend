import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        if (isLoginMode) {
        } else {
            try {
                setIsLoading(true);
                const response = await fetch(
                    "http://localhost:5000/api/users/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: formState.inputs.name.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );
                const responseData = await response.json();
                console.log({ responseData });
                if (!response.ok) {
                    throw new Error(responseData.message);
                    // 404, 422 등의 에러를 에러로 인식하지 않아 직접 에러 처리함
                    // catch 블록으로 넘어간다
                }
                setIsLoading(false);
                auth.login();
            } catch (err) {
                setError(err.message || "알 수 없는 에러 발생");
                setIsLoading(false);
            }
        }
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

    const errorHandler = () => {
        setError(null);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>{isLoginMode ? "로그인" : "회원가입"}</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
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
        </React.Fragment>
    );
};

export default Auth;
