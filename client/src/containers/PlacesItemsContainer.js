import { default as React, Component } from 'react'
import { Header, Item } from 'semantic-ui-react'

import PlaceItem from '../components/PlaceItem'

class PlacesItemsContainer extends Component {
  render () {
    return (
      <div>
        <Header>
          {this.props.results && this.props.places.length !== 0 ? 'Choose your meetup destination:' : null}
        </Header>
        {(this.props.results && this.props.places.length === 0) ? 'No results found near the locations\' midpoint' : null}
        <Item.Group divided className='place-results'>
          {this.props.places.map((place, index) => (
            <PlaceItem place={place} key={index} index={index} meetupIndex={this.props.meetupIndex} onPlaceClick={this.props.onPlaceClick} />
          ))}
        </Item.Group>
      </div>
    )
  }
}

export default PlacesItemsContainer
