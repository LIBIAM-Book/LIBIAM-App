export const bookDataReducer = (state, action) => {
  const { type, payload } = action;
  
  // Update book story for appropriate page
  switch (type) {
    case "LOAD_ALL":
      return {
        ...payload
      }
    case "COVER":
      return {
        ...state,
        cover: {
          ...state.cover,
          Text: payload
        }
      };
    case "PAGE_1":
      return {
        ...state,
        firstPage: {
          ...state.firstPage,
          Text: payload
        }
      };
    case "PAGE_2":
      return {
        ...state,
        secondPage: {
          ...state.secondPage,
          Text: payload
        }
      };
    case "PAGE_3":
      return {
        ...state,
        thirdPage: {
          ...state.thirdPage,
          Text: payload
        }
      };
    case "END":
      return {
        ...state,
        end: {
          ...state.end,
          Text: payload
        }
      };
    default:
      return {
        ...state
      };
  }
}