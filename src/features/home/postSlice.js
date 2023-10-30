import { produce } from "immer";

const initialState = {
	post: [],
	news: [],
	myPost: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "postStore/SET_ALL_POST":
			const nextPost = produce(state, (draft) => {
				draft.post = action.payload;
			});
			return nextPost;

		case "postStore/SET_ALL_NEWS":
			const nextNews = produce(state, (draft) => {
				draft.news = action.payload;
			});
			return nextNews;

		case "postStore/SET_MY_POST":
			const nextMyPost = produce(state, (draft) => {
				draft.myPost = action.payload;
			});
			return nextMyPost;

		////////////////
		default:
			return state;
	}
};

export default reducer;
