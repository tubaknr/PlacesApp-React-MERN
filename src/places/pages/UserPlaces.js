import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
    {
        id: "p1",
        imageUrl: "/ayasofya.png",
        title: "Hagia Sophia Grand Mosque",
        description: "One of the best ancient places int he world!",
        address: "Sultan Ahmet, Ayasofya Meydani No:1, 34122 Fatih/Istanbul",
        creator: "u1",
        location: {
            lat: 41.008587,
            lng: 28.9776001
        },
    },
    {
        id: "p2",
        imageUrl: "/ayasofya.png",
        title: "Hagia Sophia Grand Mosque",
        description: "One of the best ancient places int he world!",
        address: "Sultan Ahmet, Ayasofya Meydani No:1, 34122 Fatih/Istanbul",
        creator: "u2",
        location: {
            lat: 41.008587,
            lng: 28.9776001
        },
    }
];

const UserPlaces = () => {
    // /:userId/places
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return <PlaceList items={loadedPlaces}/>
};

export default UserPlaces;
