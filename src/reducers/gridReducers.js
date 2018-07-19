import { ADD_GRID, UPDATE_GRID, SPRITE_DATA } from "../actions/types";
import update from 'immutability-helper'

const initialState = {
	grid:[],
  sprite_data:''
}

const StoryReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case SPRITE_DATA:
    return {...state, sprite_data: action.data }

    case ADD_GRID:
    return {...state, grid:action.payload }
    
    case UPDATE_GRID:
    return Object.assign({}, state, update(state, 
          { grid: 
            { 
              [action.posx]: { 
                grids:{
                  [action.posy]:{
                    active:{
                        $set: action.active
                    }
                  }
                }
              }
            } 
          }) 
      )

    default:
      return state;
  }
};


export default StoryReducer;