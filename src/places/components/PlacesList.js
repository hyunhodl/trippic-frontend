import React from "react";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";

import "./PlacesList.css";

const PlacesList = (props) => {
    if (props.items.length === 0) {
        return (
            <Card>
                <h2>
                    표시할 장소가 없습니다. 나만의 여행지를 다른 사람들과
                    공유해보세요!
                </h2>
                <button>여행지 공유하기</button>
            </Card>
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
                    imageUrl={place.imageUrl}
                    address={place.address}
                    location={place.location}
                />
            ))}
        </ul>
    );
};

export default PlacesList;
