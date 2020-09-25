import React, { useEffect, useState } from "react";
import fakeData from "../FakeData/FakeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import './Home.css'

const Home = () => {
    const [place, setPlace] = useState([]);
    

    useEffect(() => {
        const FakeData = fakeData;
        setPlace(FakeData)
    },  [])

 

  return (
    <div className="homeContainer">
      <Carousel controls={false}>
        {place.map((place) => (
          <Carousel.Item key={place.id}>
            <Row>
              <Col md={8}>
                <div className="m-5">
                  <h1>{place.name.toUpperCase()}</h1>
                  <p>{place.description}</p>
                  <NavLink to={`/booking/${place.id}`}>
                    <Button className="mt-2" variant="warning">
                      <b>
                        Booking 
                        <FontAwesomeIcon
                          className="pt-1"
                          icon={faLongArrowAltRight}
                        />
                      </b>
                    </Button>
                  </NavLink>
                </div>
              </Col>
              <Col md={4}>
                <div className="slider-image">
                  <img
                    className="w-100"
                    src={place.img}
                    alt="slide"
                  />
                  <Carousel.Caption>
                    <h3>{place.name}</h3>
                  </Carousel.Caption>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
