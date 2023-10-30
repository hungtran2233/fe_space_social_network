import { produce } from "immer";

const initialState = {
	userList: [],
	groupConversation: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "messageStore/userStore/SET_USER_LIST":
			const nextUserList = produce(state, (draft) => {
				draft.userList = action.payload;
			});
			return nextUserList;

		case "messageStore/conversationStore/SET_GROUP_CONVERSATION":
			const nextGroup = produce(state, (draft) => {
				draft.groupConversation = action.payload;
			});
			return nextGroup;

		default:
			return state;
	}
};

export default reducer;
