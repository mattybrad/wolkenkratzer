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
    },
    postProject: (title, path, description, tags) => {
      dispatch(Actions.postProject(title, path, description, tags));
    }
  }
}

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleField: '',
      pathField: '',
      descriptionField: '',
      tagsField: ''
    }
  }

  componentDidMount() {
    //this.props.fetchProject(this.props.params.project);
  }

  onValueChange(name) {
    var p = {}
    p[name] = this.refs[name].value;
    this.setState(p);
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.postProject(
      this.state.titleField,
      this.state.pathField,
      this.state.descriptionField,
      this.state.tagsField.split(",")
    )
  }

  render() {
    return (
      <div>
        <BackgroundDefinition primaryColor='#cc0000' secondaryColor='#00cc00' />
        <AmbientDefinition freq={440} />
        <h1>{this.props.params.project?"Edit Project":"Create Project"}</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <p>
            <label>Title</label><br/>
            <input ref="titleField" type="text" onChange={this.onValueChange.bind(this, 'titleField')} value={this.state.titleField} />
          </p>
          <p>
            <label>Path</label><br/>
            <input ref="pathField" type="text" onChange={this.onValueChange.bind(this, 'pathField')} value={this.state.pathField} />
          </p>
          <p>
            <label>Description</label><br/>
            <input ref="descriptionField" type="text" onChange={this.onValueChange.bind(this, 'descriptionField')} value={this.state.descriptionField} />
          </p>
          <p>
            <label>Tags</label><br/>
            <input ref="tagsField" type="text" onChange={this.onValueChange.bind(this, 'tagsField')} value={this.state.tagsField} />
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </div>
    )
  }
}

const PageReduxComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent);

export default PageReduxComponent;
