import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class SimpleMap extends Component {
 
    render() {
        return (
            // Important! Always set the container height explicitly
            <div>
                    <Map style={{ height: '300px', width: '500px' }} google={this.props.google} zoom={14}>
                
                        <Marker onClick={this.onMarkerClick}
                                name={'Current location'} />
                
                        <InfoWindow onClose={this.onInfoWindowClose}>
                        </InfoWindow>
                    </Map>
            </div>
        );
    }
}
 

export default GoogleApiWrapper({
    apiKey: ("YOUR_GOOGLE_API_KEY_GOES_HERE")
  })(SimpleMap)