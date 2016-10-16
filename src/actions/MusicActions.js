export const SET_MUSIC_ACTIVE = 'SET_MUSIC_ACTIVE';
export function setMusicActive(isActive) {
  return {
    type: SET_MUSIC_ACTIVE,
    isActive
  }
}

export const SET_AMBIENCE = 'SET_AMBIENCE';
export function setAmbience(name, channels) {
  return {
    type: SET_AMBIENCE,
    name,
    channels
  }
}
