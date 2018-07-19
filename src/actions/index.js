import { ADD_GRID, UPDATE_GRID, SPRITE_DATA } from './types'



export const addGrid = grid => dispatch => {

	dispatch({
		type: ADD_GRID,
		payload: grid
	})

}

export const spriteData = data => dispatch => {

	dispatch({
		type: SPRITE_DATA,
		data
	})

}

export const updateGrid = (posx, posy, active) => dispatch => {
	
	dispatch({
		type: UPDATE_GRID,
		posx,
		posy,
		active
	})

}