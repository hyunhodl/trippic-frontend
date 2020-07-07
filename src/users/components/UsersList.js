import React from "react";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

import "./UsersList.css";

const UsersList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>표시할 유저가 없습니다.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.items.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    imageUrl={user.image}
                    placesCount={user.places.length}
                />
            ))}
        </ul>
    );
};

export default UsersList;
