import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Logo.png";
import { Col, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "./Header.css";
import { UserContext } from "../../App";
import firebaseConfig from "../Login/firebase.config"
import * as firebase from "firebase/app";


const Header = () => {
  const[loggedInUser, setLoggedInUser] = useContext(UserContext)

  if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }

    var user = firebase.auth().currentUser;
    let loggedInUserName;
    if (user) {
        loggedInUserName = user.displayName;
    } else {
    // No user is signed in.
    }
  return (
    <Row className="container">
        <Col md={4}>
            <div className="logo">
            <Link to="/home">
                <img src={Logo} alt="" />
            </Link>
            </div>
        </Col>
        <Col md={8}>
            <div className="navigation">
            <Link to="/home" className="menu">Home</Link>
            <Link to="/destination" className="menu">Destination</Link>
            <Link to="/news" className="menu">News</Link>
            <Link to="/contact" className="menu">Contact</Link>
            
            {
              loggedInUser.email? <> <p style={{display: 'inline', margin: 0}}>Welcome, {loggedInUserName}</p> <button className="signOutBtn" onClick={() => setLoggedInUser({})}>Sign out</button></> : <Link to="/login" className="loginBtn menu">Login</Link>
            }

            </div>
        </Col>
    </Row>
  );
};

export default Header;
