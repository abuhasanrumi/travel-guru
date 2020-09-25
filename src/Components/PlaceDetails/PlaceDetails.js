import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import fakeData from "../FakeData/FakeData";
import './PlaceDetails.css'

const PlaceDetails = () => {
    const {placeId} = useParams()
    const samePlace = fakeData.find(pl => pl.id === Number(placeId))

    const {name, description, id} = samePlace;
    const handleSubmit = () => {
        
    }
    const handleBlur = (e) => {
        
    }
    return (
        <div>
            <Row>
                <Col md={6}>
                    <h1>{name.toUpperCase()}</h1>
                    <p>{description}</p>
                </Col>
                <Col md={6}>
                    <div className="detailsBox">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="origin">Origin</label><br/>
                            <input onBlur={handleBlur} type="text" name="origin" defaultValue="Feni"></input>
                            <br/>
                            <label htmlFor="destination">Destination</label><br/>
                            <input onBlur={handleBlur} type="text" name="destination" defaultValue={name}></input>
                            <div className="dates">
                                <Row>
                                    <Col md={6}>
                                        <label htmlFor="fromDate">From</label>
                                        <input onBlur={handleBlur} type="date" name="fromDate" defaultValue={name} required/>
                                    </Col>
                                    <Col md={6}>
                                        <label htmlFor="toDate">To</label>
                                        <input onBlur={handleBlur} type="date" name="toDate" defaultValue={name} required/>
                                    </Col>
                                </Row>
                            </div>
                            <Link to={"/room/"+id}><input onClick={handleSubmit} className="bookBtn" type="submit" value="Start Booking"></input></Link>
                        </form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceDetails;