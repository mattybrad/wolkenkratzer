import React from 'react';
import BackgroundDefinition from '../components/BackgroundDefinition';
import AmbientDefinition from '../components/AmbientDefinition';

export default class PageComponent extends React.Component {
  render() {
    return (
      <div>
        <BackgroundDefinition primaryColor='#00cccc' secondaryColor='#0000ff' />
        <AmbientDefinition
          name="home"
          channels={
            [
              {
                type: "oscSet",
                notes: ["G3","B3","D3","E4","G4","B4","D4"],
                wave: "square",
                probability: 1
              },
              {
                type: "oscSet",
                notes: ["G2","G3","G4"],
                wave: "sine",
                probability: 1
              },
              {
                type: "crossfadeLoop",
                path: "testloop.mp3",
                fadeTime: 15
              }
            ]
          }
        />
        <h1>{"Matt's website"}</h1>
        <p>My name is Matt and this is my website.</p>
        <p>The site contains text and sound and pictures and information and thoughts, but the container is itself formed of these things, in a way that could be considered gently meta.</p>
        <p>Please feel free to explore.</p>
      </div>
    )
  }
}
