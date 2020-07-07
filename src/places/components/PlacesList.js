import React from "react";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

import "./PlacesList.css";

const PlacesList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="places-list center">
                <Card>
                    <h2>표시할 장소가 없습니다. 새로 등록하시겠습니까?</h2>
                    <Button to="/places/new">여행지 공유하기</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="places-list">
            {props.items.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    title={place.title}
                    description={place.description}
                    image={place.image}
                    address={place.address}
                    location={place.location}
                    creatorId={place.creator}
                    onDelete={props.onDeletePlace}
                />
            ))}
        </ul>
    );
};

export default PlacesList;
