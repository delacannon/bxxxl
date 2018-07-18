import { ADD_GRID } from "../actions/types";

const initialState = {
	grid:[],
}

const StoryReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_GRID:
    return { 
        ...state,
        panels:  [...state.panels, {panel:action.payload, id: action.id}], 
    }
    default:
      return state;
  }
};


export default StoryReducer;