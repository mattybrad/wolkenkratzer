import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import * as Actions from '../actions/MusicActions';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAmbience: (name, channels) => {
      dispatch(Actions.setAmbience(name, channels));
    }
  }
}

class AmbientDefinitionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      
		}
	}

	componentDidMount() {
		this.props.setAmbience(this.props.name, this.props.channels);
	}

	render() {
		return (
		    null
		)
	}
}

AmbientDefinitionComponent.defaultProps = {
  name: "unnamed" + Math.floor(1000000000*Math.random()).toString(),
  channels: []
}

const AmbientDefinition = connect(
  mapStateToProps,
  mapDispatchToProps
)(AmbientDefinitionComponent);

export default AmbientDefinition;
