import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlacesList from "../components/PlacesList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = (props) => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { clearError, isLoading, error, sendRequest } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            } catch (err) {}
        };
        fetchUsers();
    }, [sendRequest, userId]);

    const placedDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces((prevPlaces) =>
            prevPlaces.filter((place) => place.id !== deletedPlaceId)
        );
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && (
                <PlacesList
                    items={loadedPlaces}
                    onDeletePlace={placedDeletedHandler}
                />
            )}
        </React.Fragment>
    );
};

export default UserPlaces;
