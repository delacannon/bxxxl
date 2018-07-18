import { combineReducers } from "redux";
import gridReducers from './gridReducers';

const rootReducer = combineReducers({
	grid:gridReducers
});

export default rootReducer;