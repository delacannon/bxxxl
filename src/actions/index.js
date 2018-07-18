import { ADD_GRID } from './types'


export const addGrid = grid => dispatch => {

	dispatch({
		type: ADD_GRID,
		payload: grid
	})

}