import React from 'react';
import BackgroundDefinition from '../components/BackgroundDefinition';
import AmbientDefinition from '../components/AmbientDefinition';

export default class NotFoundComponent extends React.Component {
  render() {
    return (
      <div>
        <BackgroundDefinition primaryColor='#000000' secondaryColor='#666666' />
        <h1>Page Not Found</h1>
        <p>Sorry, there is nothing at this address.</p>
      </div>
    )
  }
}
