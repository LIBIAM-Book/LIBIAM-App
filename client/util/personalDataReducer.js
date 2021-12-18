export const personalDataReducer = (state, action) => {
  const { type, payload } = action;
  const { key, value } = payload

  switch (type) {
    case "THINGS":
      return {
        ...state,
        favoriteThings: {
          ...state.favoriteThings,
          key: value
        }
      }
    case "PLACES":
      return {
        ...state,
        favoritePlaces: {
          ...state.favoritePlaces,
          key: value
        }
      }
    case "COLORS":
      return {
        ...state,
        favoriteColors: {
          ...state.favoriteColors,
          key: value
        }
      }
    case "WEATHER":
      return {
        ...state,
        favoriteWeather: {
          ...state.favoriteWeather,
          key: value
        }
      }
    case "TIME":
      return {
        ...state,
        favoriteTime: {
          ...state.favoriteTime,
          key: value
        }
      }
    default:
      return state;
  }
}