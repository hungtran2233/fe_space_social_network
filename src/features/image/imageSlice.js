import { produce } from "immer";

const initialState = {
	allSpaceImage: [],
	myAlbum: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "imageStore/SET_MY_ALBUM":
			const nextMyAlbum = produce(state, (draft) => {
				draft.myAlbum = action.payload;
			});
			return nextMyAlbum;

		default:
			return state;
	}
};

export default reducer;
