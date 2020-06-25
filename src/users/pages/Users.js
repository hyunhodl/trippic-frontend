import React from "react";
import UsersList from "../components/UsersList";

const DUMMY_USERS = [
    {
        id: "u1",
        name: "현호",
        imageUrl:
            "https://hyunhodl.github.io/my-portfolio/static/media/profile-image.1bc06f07.jpg",
        placesCount: 3,
    },
];

const Users = (props) => {
    return <UsersList items={DUMMY_USERS} />;
};

export default Users;
