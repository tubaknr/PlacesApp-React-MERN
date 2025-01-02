import React from "react";
import {useState} from "react";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UIElements/Map"
import './PlaceItem.css';

const PlaceItem = props => {
    const placeId = props.id;

    const [showMap, setShowMap] = useState(false);

    const closeMapHandler = () => setShowMap(false);
    const openMapHandler = () => setShowMap(true);

    return(
        <React.Fragment>
            <Modal 
                show={showMap} 
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footer={
                    <Button onClick={closeMapHandler}>
                        CLOSE
                    </Button>
                }
                footerClass="place-item__modal-actions"
            >
                <div className="map-container">
                    <Map/>
                </div>
            </Modal>


            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title}/>
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                        <p>{props.address}</p>
                        <p>{props.creatorId}</p>
                        <p>{props.coordinates}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/places/${placeId}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card> 
            </li>
        </React.Fragment>
    )
};

export default PlaceItem;
