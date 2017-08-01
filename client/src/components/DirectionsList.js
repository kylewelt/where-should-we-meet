import { default as React, Component } from 'react'
import { Grid, Header, Item } from 'semantic-ui-react'

import DirectionsItem from './DirectionsItem'
import DirectionsStep from './DirectionsStep'

class DirectionsList extends Component {
  render () {
    console.log('directions:', this.props.directions)
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header>Route Overview</Header>
          </Grid.Column>
        </Grid.Row>
        {this.props.directions !== null ? <DirectionsItem route={this.props.directions.routes[0]} /> : null}
        <Grid.Row>
          <Grid.Column>
            <Header>Directions</Header>
            <Item.Group divided>
              {(this.props.directions !== null)
                ? this.props.directions.routes[0].legs[0].steps.map(step => {
                  return <DirectionsStep step={step} />
                })
                : null}
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default DirectionsList
