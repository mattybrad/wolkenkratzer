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

export const REQUEST_POST_PROJECT = 'REQUEST_POST_PROJECT';
export function requestPostProject(title, path, description, tags) {
  return {
    type: REQUEST_POST_PROJECT,
    title,
    path,
    description,
    tags
  }
}

export const SUCCESS_POST_PROJECT = 'SUCCESS_POST_PROJECT';
export function successPostProject() {
  return {
    type: SUCCESS_POST_PROJECT
  }
}

export const FAILURE_POST_PROJECT = 'FAILURE_POST_PROJECT';
export function failurePostProject(message) {
  return {
    type: FAILURE_POST_PROJECT,
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

export function postProject(title, path, description, tags) {
  return function(dispatch) {
    dispatch(requestPostProject(title, path, description, tags));
    projects
      .post({
        title,
        path,
        description,
        tags
      })
      .then(function(json) {
        dispatch(successPostProject(json));
      })
      .catch(function(err) {
        dispatch(failurePostProject(err.message));
      })
  }
}
