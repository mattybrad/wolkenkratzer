import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/ProjectActions';
import BackgroundDefinition from '../components/BackgroundDefinition';
import AmbientDefinition from '../components/AmbientDefinition';
import ProjectPreview from '../components/ProjectPreview';

const mapStateToProps = (state) => {
  return {
    projects: state.Projects.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => {
      dispatch(Actions.fetchProjects());
    }
  }
}

class PageComponent extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    var title="My Project";
    var description="A project wherein I did some stuff, maybe some other stuff. Used certain technologies or techniques.";
    return (
      <div>
        <BackgroundDefinition primaryColor='#ffff00' secondaryColor='#ff0000' />
        <AmbientDefinition freq={440} />
        <h1>Projects</h1>
        <p>This is a future list of projects.</p>
        {this.props.projects.map(function(project, idx){
          return (
            <ProjectPreview key={"project_"+idx}
              title={project.title}
              path={project.path}
              description={project.description}
              tags={project.tags}
            />
          )
        })}
      </div>
    )
  }
}

const PageReduxComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent);

export default PageReduxComponent;
