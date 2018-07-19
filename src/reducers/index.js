import { combineReducers } from "redux";
import gridReducers from './gridReducers';

const rootReducer = combineReducers({
	grid:gridReducers,
	sprite_data:gridReducers
});

export default rootReducer;