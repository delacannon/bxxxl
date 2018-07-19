import { combineReducers } from "redux";
import gridReducers from './gridReducers';

const rootReducer = combineReducers({
	grid:gridReducers,
	sprite_data:gridReducers,
	sprite_data_url:gridReducers
});

export default rootReducer;