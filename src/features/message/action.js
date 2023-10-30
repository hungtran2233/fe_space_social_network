import instance from "api/instance";
import { v4 as uuidv4 } from "uuid";
//
export const fetchAllUserAction = async (dispatch, myId) => {
	try {
		const res = await instance.request({
			url: "/user/get-all-user",
			method: "GET",
		});

		dispatch({
			type: "messageStore/userStore/SET_USER_LIST",
			payload: res.data.content,
		});
	} catch (error) {
		console.log(error);
	}
};

// Tạo conversation group
export const createGroupConversationAction = async (name, arrUserId) => {
	try {
		const conversationUuid = uuidv4();
		const res = await instance.request({
			url: "/conversation/post-conversation-group",
			method: "POST",
			data: {
				conversation_name: name,
				uuid_v4: conversationUuid,
				group_user_list: arrUserId,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

// Lấy tất cả conversation
export const getAllConversationAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/conversation/get-conversation-group",
			method: "GET",
		});
		// console.log(res.data.content);
		dispatch({
			type: "messageStore/conversationStore/SET_GROUP_CONVERSATION",
			payload: res.data.content,
		});
	} catch (error) {
		console.log(error);
	}
};

// Thêm thành viên vào group
export const addMemberGroupAction = async (arrUserId, conversation_id) => {
	try {
		const res = await instance.request({
			url: "/conversation/add-member-group",
			method: "PUT",
			data: {
				conversation_id: conversation_id,
				group_user_list: arrUserId,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
