import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/contexts/auth-context";

import "./PlaceForm.css";

const NewPlace = (props) => {
    const auth = useContext(AuthContext);
    const { clearError, error, isLoading, sendRequest } = useHttpClient();
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
            image: {
                value: null,
                isValid: false,
            },
        },
        false
    );

    const history = useHistory();

    const placeSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", formState.inputs.title.value);
            formData.append("description", formState.inputs.description.value);
            formData.append("address", formState.inputs.address.value);
            formData.append("image", formState.inputs.image.value);
            formData.append("creator", auth.userId);

            await sendRequest(
                "http://localhost:5000/api/places",
                "POST",
                {},
                formData
            );

            history.push(`/${auth.userId}/places`);
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <ImageUpload
                    id="image"
                    center
                    onInput={inputHandler}
                    errorText="사진을 등록하세요."
                />
                <Input
                    element="input"
                    type="text"
                    id="title"
                    label="제목"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="제목을 입력하세요."
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
                    errorText="주소를 입력하세요. (최소 5자 이상)"
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
        </React.Fragment>
    );
};

export default NewPlace;
