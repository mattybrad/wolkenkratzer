import * as Actions from '../actions/MusicActions';

export default function Background(
  state = {
    active: true,
    activeChannelSet: null,
    channelSets: {}
  },
  action
) {
  switch(action.type) {
    case Actions.SET_MUSIC_ACTIVE:
    return Object.assign({}, state, {
      active: action.isActive
    });

    case Actions.SET_AMBIENCE:
    var channelSetCopy = JSON.parse(JSON.stringify(state.channelSets));
    channelSetCopy[action.name] = action.channels;
    return Object.assign({}, state, {
      channelSets: channelSetCopy,
      activeChannelSet: action.name
    });

    default:
    return state
  }
}
