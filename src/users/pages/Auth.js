import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/contexts/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Auth.css";

const Auth = (props) => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

        console.log(formState.inputs);

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/api/users/login",
                    "POST",
                    {
                        "Content-Type": "application/json",
                    },
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    })
                );
                auth.login(responseData.user.id);
            } catch (err) {}
        } else {
            try {
                const formData = new FormData();
                formData.append("email", formState.inputs.email.value);
                formData.append("name", formState.inputs.name.value);
                formData.append("password", formState.inputs.password.value);
                formData.append("image", formState.inputs.image.value);
                const responseData = await sendRequest(
                    "http://localhost:5000/api/users/signup",
                    "POST",
                    {},
                    formData
                );

                auth.login(responseData.user.id);
            } catch (err) {}
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
                    image: {
                        value: null,
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
                    image: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
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
                    {!isLoginMode && (
                        <ImageUpload
                            id="image"
                            center
                            onInput={inputHandler}
                            errorText="사진을 등록하세요."
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
