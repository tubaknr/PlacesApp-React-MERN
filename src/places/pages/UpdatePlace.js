import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/components/util/validators";
import Button from "../../shared/components/FormElements/Button";

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


const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    if(!identifiedPlace){
        return(
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        );
    }

    return(
        <form >
            <Input 
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Plase enter a valid title."
                onInput={() => {}}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input 
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Plase enter a valid description min 5 char."
                onInput={() => {}}
                value={identifiedPlace.description}
                valid={true}
            />
            <Button type="submit" disabled={true}>
                UPDATE PLACE
            </Button>
        </form>
    )
};

export default UpdatePlace;