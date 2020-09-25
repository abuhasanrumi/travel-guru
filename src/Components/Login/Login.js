import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import { Col, Row } from 'react-bootstrap';

const Login = () => {
    const [user, setUser] = useState({
        isSignedIn: false, 
        name: '',
        password: '',  
        email: '', 
        error: '',
        success: '',
    })

    const [newUser, setNewUser] = useState(false)

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const[loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        
        firebase.auth().signInWithPopup(googleProvider)
        .then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {isSignedIn: true, name: displayName, email: email}
            setLoggedInUser(signedInUser)
            history.replace(from);
            
            
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
    }

    const handleFbSignIn = () => {
        
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            
            var user = result.user;
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email: email}
            setLoggedInUser(signedInUser)
            history.replace(from);

          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });

    }

    const handleSubmit = (e) => {

        if(newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then (res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true;
                updateUserName(user.name)
                setLoggedInUser(newUserInfo)
                setUser(newUserInfo)
                verifyEmail();
                
            })
            .catch(error => {
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
            });
            
        }

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo)
                history.replace(from);
            })
            .catch(function(error) {
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
              });
        }
        e.preventDefault();

    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        
        user.updateProfile({
        displayName: name,
        }).then(function() {
        // Update successful.
        }).catch(function(error) {
        // An error happened.
        });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo) 
            console.log(newUserInfo)
        }
        
    }

    const verifyEmail = () => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
        // Email sent.
        alert('A verification email was sent to you.');
        }).catch(function(error) {
        // An error happened.
        });
    }

    const resetPass = email => {
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
        alert('A password reset email was sent')
        }).catch(function(error) {
        // An error happened.
        });
    }

    return (
        <div className="login-area">
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <h1 className="loginTitle">{newUser ? 'Register' : 'Login'}</h1>
                    <form onSubmit={handleSubmit} action="">
                        {
                            newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Your Name" required/>
                        }
                        <input onBlur={handleBlur} type="text" name="email" placeholder="Your Email" required/>
                        <input onBlur={handleBlur} type="password" name="password" placeholder="Password" required/>
                        
                        <input type="submit" value={newUser ? 'Sign Up' : 'Sign in'}/>
                    </form>
                    <p style={{color: "red"}}>{user.error}</p>
                    {
                        user.success && <p style={{color: "green"}}>User {newUser ? 'created successfully, please click Log In below' : 'logged in successfully'}</p>
                    }

                    <div className="helpZone">
                        <p onClick={() => resetPass(user.email)} className="help">Forgot Password</p>
                        
                        <p onClick={() => setNewUser(!newUser)} name="newUser" className="help">{newUser ? 'Login' : 'Create Account'}</p>
                    </div>

                    <div className="instantLoginBtns">
                        <button onClick={handleGoogleSignIn}>Google Sign in</button>
                        <button onClick={handleFbSignIn}>Facebook Sign in</button>
                    </div>
                </Col>
            </Row>
            
        </div>
    );
};

export default Login;