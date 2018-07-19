import { ADD_GRID, UPDATE_GRID, SPRITE_DATA,SPRITE_DATA_URL } from './types'



export const addGrid = grid => dispatch => {

	dispatch({
		type: ADD_GRID,
		payload: grid
	})

}

export const spriteDataURL= image => dispatch => {

	dispatch({
		type: SPRITE_DATA_URL,
		payload: image
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