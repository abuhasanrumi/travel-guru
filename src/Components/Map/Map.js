import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { useParams } from 'react-router-dom';
import hotel from '../FakeData/HotelData';

const mapStyles = {
  width: '100%',
  height: '100%'
};



export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCFLlRSicyGkDotn6g7dIQ3wy_0HjHx6D0'
})(MapContainer);