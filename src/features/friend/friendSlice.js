import { produce } from "immer";

const initialState = {
	allFriends: null,
	friendInvitation: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// Lấy tất cả bạn bè
		case "auth/SET_ALL_FRIENDS":
			return produce(state, (draft) => {
				draft.allFriends = action.payload;
			});

		// Lấy tất cả lời mời kết bạn
		case "auth/SET_FRIEND_INVITATION":
			return produce(state, (draft) => {
				draft.friendInvitation = action.payload;
			});

		default:
			return state;
	}
};

export default reducer;
