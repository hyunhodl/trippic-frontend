import React from "react";
import UserItem from "./UserItem";

import "./UsersList.css";

const UsersList = (props) => {
    return (
        <ul className="users-list">
            {props.items.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    imageUrl={user.imageUrl}
                    placesCount={user.placesCount}
                />
            ))}
        </ul>
    );
};

export default UsersList;
