import React from "react";
import PlacesList from "../components/PlacesList";

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

const UserPlaces = (props) => {
    return <PlacesList items={DUMMY_PLACES} />;
};

export default UserPlaces;
