import canUseDOM from 'can-use-dom'
import raf from 'raf'
import { default as React, Component } from 'react'
import { withGoogleMap, GoogleMap, Circle, InfoWindow } from 'react-google-maps'
import { Dimmer, Loader } from 'semantic-ui-react'

const geolocation = ( canUseDOM && navigator.geolocation ? navigator.geolocation : ({ getCurrentPosition(success, failure) { failure(`Your browser doesn't support geolocation.`) }, }) )

const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    center={props.center}
  >
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1
        }}
      />
    )}
  </GoogleMap>
))

/*
 * Add <script src='https://maps.googleapis.com/maps/api/js'></script> to your HTML to provide google.maps reference
 */
export default class GeolocationExample extends Component {
  state = {
    center: null,
    radius: 2000,
    loading: true
  }

  isUnmounted = false

  componentDidMount () {
    const tick = () => {
      if (this.isUnmounted) {
        return
      }

      this.setState({ radius: Math.max(this.state.radius - 20, 0) })
      if (this.state.radius > 200) {
        raf(tick)
      }
    }

    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return
      }

      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })

      this.setState({ loading: false })

      raf(tick)
    }, (reason) => {
      if (this.isUnmounted) {
        return
      }

      this.setState({
        center: {
          lat: 40.783060,
          lng: -73.971249
        }
      })
    })
  }

  componentWillUnmount () {
    this.isUnmounted = true
  }

  render () {
    return (
      <div>
        <Dimmer active={this.state.loading} inverted>
          <Loader inverted>Finding location...</Loader>
        </Dimmer>
        <GeolocationExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div id='location-map' style={{ height: `500px` }} />
          }
          center={this.state.center}
          radius={this.state.radius}
        />
      </div>
    )
  }
}