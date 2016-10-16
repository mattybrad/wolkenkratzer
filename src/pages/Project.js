import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/ProjectActions';
import BackgroundDefinition from '../components/BackgroundDefinition';
import AmbientDefinition from '../components/AmbientDefinition';

const mapStateToProps = (state) => {
  return {
    project: state.Projects.project,
    isFetching: state.Projects.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: (projectName) => {
      dispatch(Actions.fetchProject(projectName));
    }
  }
}

class PageComponent extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.params.project);
  }

  render() {
    return (
      <div>
        <BackgroundDefinition primaryColor='#cccc00' secondaryColor='#006600' />
        <AmbientDefinition freq={440} />
        {
          this.props.project?<div>
            <h1>{this.props.project.title}</h1>
          </div>:null
        }
      </div>
    )
  }
}

const PageReduxComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent);

export default PageReduxComponent;
