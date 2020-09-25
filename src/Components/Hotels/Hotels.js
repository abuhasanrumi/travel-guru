import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import hotel from "../FakeData/HotelData";
import fakeData from "../FakeData/FakeData";
import Map from "../Map/Map";
import './Hotels.css'
import { UserContext } from '../../App';
import firebaseConfig from "../Login/firebase.config"
import * as firebase from "firebase/app";

const Hotels = () => {
    const {placeId} = useParams();
    if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }
    
    const room = hotel.filter(room => room.id === Number(placeId))
    const placeName = fakeData.filter(place => place.id === Number(placeId))

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    var user = firebase.auth().currentUser;
    let loggedInUserName;
    if (user) {
        loggedInUserName = user.displayName;
    } else {
    // No user is signed in.
    }

    return (
        <div>
            <p style={{margin: 0}}>{loggedInUserName} wants to book a room</p>
            <h1>Stay in {placeName[0].name}</h1>
            <Row>
                <Col md={6}>
                    <div className="hotelDetails">
                        {
                            room.map(room => <HotelDetails key={room.roomId} room={room}></HotelDetails>)
                        }
                    </div>
                </Col>
                <Col md={6}>
                    <div className="mapArea">
                        <Map long={room.long} lat={room.lat}></Map>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const HotelDetails = (props) => {
    const {id, roomId, image, title, type, type1, type2, dollars} = props.room;
    return (
        <div >
            <Row className="roomCard">
                <Col md={5}>
                    <div className="roomImg">
                        <img src={image} alt=""/>
                    </div>
                </Col>
                <Col md={7}>
                    <div className="roomDetails">
                        <h2>{title}</h2>
                        <div>{type}</div>
                        <div>{type1}</div>
                        <div>{type2}</div>
                        <h4>{dollars}</h4>
                    </div>
                </Col>
            </Row>
        </div>
    )
}



export default Hotels;