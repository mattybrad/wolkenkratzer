import fetchival from 'fetchival';
let projects = fetchival('/api/v1/projects');

export const REQUEST_FETCH_PROJECTS = 'REQUEST_FETCH_PROJECTS';
export function requestFetchProjects() {
  return {
    type: REQUEST_FETCH_PROJECTS
  }
}

export const SUCCESS_FETCH_PROJECTS = 'SUCCESS_FETCH_PROJECTS';
export function successFetchProjects(projects) {
  return {
    type: SUCCESS_FETCH_PROJECTS,
    projects
  }
}

export const FAILURE_FETCH_PROJECTS = 'FAILURE_FETCH_PROJECTS';
export function failureFetchProjects(message) {
  return {
    type: FAILURE_FETCH_PROJECTS,
    message
  }
}

export const REQUEST_FETCH_PROJECT = 'REQUEST_FETCH_PROJECT';
export function requestFetchProject() {
  return {
    type: REQUEST_FETCH_PROJECT
  }
}

export const SUCCESS_FETCH_PROJECT = 'SUCCESS_FETCH_PROJECT';
export function successFetchProject(project) {
  return {
    type: SUCCESS_FETCH_PROJECT,
    project
  }
}

export const FAILURE_FETCH_PROJECT = 'FAILURE_FETCH_PROJECT';
export function failureFetchProject(message) {
  return {
    type: FAILURE_FETCH_PROJECT,
    message
  }
}

export function fetchProjects() {
  return function(dispatch) {
    dispatch(requestFetchProjects());
    projects
      .get()
      .then(function(json) {
        dispatch(successFetchProjects(json));
      })
      .catch(function(err) {
        dispatch(failureFetchProjects(err.message));
      })
  }
}

export function fetchProject(projectName) {
  return function(dispatch) {
    dispatch(requestFetchProject());
    projects(projectName)
      .get()
      .then(function(json) {
        dispatch(successFetchProject(json));
      })
      .catch(function(err) {
        dispatch(failureFetchProject(err.message));
      })
  }
}
