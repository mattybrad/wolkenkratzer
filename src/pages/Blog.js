import React from 'react';
import BackgroundDefinition from '../components/BackgroundDefinition';
import AmbientDefinition from '../components/AmbientDefinition';

export default class PageComponent extends React.Component {
  render() {
    return (
      <div>
        <BackgroundDefinition primaryColor='#804000' secondaryColor='#00cc00' />
        <AmbientDefinition freq={440} />
        <h1>Blog</h1>
        <p>Here is the blog.</p>
      </div>
    )
  }
}
