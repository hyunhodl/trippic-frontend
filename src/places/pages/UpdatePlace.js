import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/contexts/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./PlaceForm.css";

const UpdatePlace = (props) => {
    const auth = useContext(AuthContext);
    const { clearError, error, isLoading, sendRequest } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/${placeId}`
                );
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true,
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (err) {}
        };
        fetchPlace();
    }, [setFormData, placeId, sendRequest]);

    const placeUpdateSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                "PATCH",
                { "Content-Type": "application/json" },
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                })
            );
            history.push(`/${auth.userId}/places`);
        } catch (err) {}
    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>장소를 찾을 수 없습니다.</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form
                    className="place-form"
                    onSubmit={placeUpdateSubmitHandler}
                >
                    <Input
                        element="input"
                        type="text"
                        id="title"
                        label="제목"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="제목을 입력하세요."
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        element="textarea"
                        id="description"
                        label="내용"
                        onInput={inputHandler}
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="내용을 입력하세요. (최소 5자 이상)"
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        수정
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default UpdatePlace;
