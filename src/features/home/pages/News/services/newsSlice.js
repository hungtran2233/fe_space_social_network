import { produce } from "immer";

const initialState = {
	news: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "postStore/SET_ALL_NEWS":
			const nextNews = produce(state, (draft) => {
				draft.news = action.payload;
			});
			return nextNews;

		////////////////
		default:
			return state;
	}
};

export default reducer;
