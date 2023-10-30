import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "features/authentication/authSlice";
import postReducer from "features/home/postSlice";
import imageReducer from "features/image/imageSlice";
import messageReducer from "features/message/messageSlice";
import otherUserReducer from "features/other-user-page/otherUserSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	auth: authReducer,
	postStore: postReducer,
	imageStore: imageReducer,
	messageStore: messageReducer,
	otherUserStore: otherUserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
