import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";

import "./UserItem.css";

const UserItem = (props) => {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${props.id}/places`}>
                    <div className="user-item__image">
                        <Avatar imageUrl={props.imageUrl} alt={props.alt} />
                    </div>
                    <div className="user-item__info">
                        <h2>{props.name}</h2>
                        {props.placesCount ? (
                            <h3>{props.placesCount} 장소</h3>
                        ) : (
                            <h3>아직 공유 중인 여행지가 없습니다.</h3>
                        )}
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
