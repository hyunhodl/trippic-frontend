import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./PlaceForm.css";

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "한밭수목원",
        description:
            "대전의 최대 도심지 둔산에 자리잡고 있는 전국 최대의 도심 속 수목원",
        imageUrl:
            "https://t1.gstatic.com/images?q=tbn:ANd9GcRIU8S3IVLwc5R1ZyvYbuJvrRPTVTScHsWrXFI-dTgmKnIm3cDMzNOo0_P9dFhLwmrozJet31Pf9TcECQ",
        address: "대전광역시 서구 둔산동 둔산대로117번길 169",
        location: {
            lat: 36.365824,
            lng: 127.387833,
        },
    },
    {
        id: "p2",
        title: "한밭수목금",
        description:
            "대전의 최대 도심지 둔산에 자리잡고 있는 전국 최대의 도심 속 수목금토일",
        imageUrl:
            "https://t1.gstatic.com/images?q=tbn:ANd9GcRIU8S3IVLwc5R1ZyvYbuJvrRPTVTScHsWrXFI-dTgmKnIm3cDMzNOo0_P9dFhLwmrozJet31Pf9TcECQ",
        address: "대전광역시 서구 둔산동 둔산대로117번길 169",
        location: {
            lat: 36.365824,
            lng: 127.387833,
        },
    },
];

const UpdatePlace = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

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

    const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace.title,
                        isValid: true,
                    },
                    description: {
                        value: identifiedPlace.description,
                        isValid: true,
                    },
                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedPlace) {
        return (
            <div className="center">
                <div className="center">
                    <Card>
                        <h2>장소를 찾을 수 없습니다.</h2>
                    </Card>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <Card>
                    <h2>로딩중...</h2>
                </Card>
            </div>
        );
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                element="input"
                type="text"
                id="title"
                label="제목"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="제목을 입력하세요."
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                element="textarea"
                id="description"
                label="내용"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="내용을 입력하세요. (최소 5자 이상)"
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                수정
            </Button>
        </form>
    );
};

export default UpdatePlace;
