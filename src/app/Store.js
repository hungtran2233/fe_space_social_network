import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "features/authentication/authSlice";
import friendReducer from "features/friend/friendSlice";
import postReducer from "features/home/postSlice";
import newsReducer from "features/home/pages/News/services/newsSlice";
import imageReducer from "features/image/imageSlice";
import messageReducer from "features/message/messageSlice";
import otherUserReducer from "features/other-user-page/otherUserSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	auth: authReducer,
	friendStore: friendReducer,
	postStore: postReducer,
	newsStore: newsReducer,
	imageStore: imageReducer,
	messageStore: messageReducer,
	otherUserStore: otherUserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
