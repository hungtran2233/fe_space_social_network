import instance from "api/instance";

// Lấy danh sách bạn bè
export const fetchAllUserFriendAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/friend-ship/show-all-friends",
			method: "GET",
		});
		dispatch({
			type: "auth/SET_ALL_FRIENDS",
			payload: res.data.content,
		});
		return res.data.content;
	} catch (error) {
		console.log(error);
	}
};

// Gửi lời mới kết bạn
export const sendFriendInvitationAction = (receiveUserId) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/friend-ship/send-invitation",
				method: "POST",
				data: {
					receive_user_id: receiveUserId,
				},
			});
			// console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
};

// Lấy tất cả lời mời kết bạn
export const fetchAllInvitationAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/friend-ship/show-all-invitation",
			method: "GET",
		});
		// console.log(res);
		dispatch({
			type: "auth/SET_FRIEND_INVITATION",
			payload: res.data.content,
		});
	} catch (error) {
		console.log(error);
	}
};

// chấp nhận lời mời kết bạn
export const acceptInvitationAction = (userId) => {
	return async (dispatch) => {
		try {
			await instance.request({
				url: `/friend-ship/update-friend-ship/${userId}`,
				method: "PUT",
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// xóa lời mời kết bạn
export const deleteInvitationAction = (userId) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: `/friend-ship/delete-friend-ship/${userId}`,
				method: "DELETE",
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Lấy tất cả đề xuất kết bạn
export const fetchAllSuggestAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/friend-ship/show-all-suggestion",
			method: "GET",
		});

		return res.data.content;
	} catch (error) {
		console.log(error);
	}
};

/////////
// Lấy Danh sách hạn chế - Block
export const fetchAllBlockedAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/block-list/get-all-blocked-user",
			method: "GET",
		});

		return res.data.content;
	} catch (error) {
		console.log(error);
	}
};

// Bỏ chặn người dùng
export const removeBlockedUserAction = (otherUserId) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/block-list/delete-blocked",
				method: "DELETE",
				data: {
					blocked_user_id: otherUserId,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
};
