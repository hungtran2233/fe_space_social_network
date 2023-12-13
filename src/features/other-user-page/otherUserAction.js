import instance from "api/instance";

// Lấy thông tin other user
export const fetchOtherUserProfileAction = (linkUrl) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: `/user/get-user-from-link-url/total-info-other-user/${linkUrl}`,
				method: "GET",
			});
			// console.log(res.data.content);
			dispatch({
				type: "otherUserStore/SET_TOTAL_INFO_OTHER_USER",
				payload: res.data.content,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Lấy thông tin trạng thái mối quan hệ bạn bè
export const fetchFriendShipStatusAction = (linkUrl) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: `/friend-ship/check-friendship-status/${linkUrl}`,
				method: "POST",
			});
			// console.log(res.data.content);
			dispatch({
				type: "otherUserStore/SET_FRIENDSHIP_STATUS",
				payload: res.data.content,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Check xem đã theo dõi đối phương hay chưa
export const fetchFollowStatusAction = (linkUrl) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: `/follow/check-follow/${linkUrl}`,
				method: "GET",
			});
			console.log(res.data.content);
			// dispatch({
			// 	type: "otherUserStore/SET_FRIENDSHIP_STATUS",
			// 	payload: res.data.content,
			// });
		} catch (error) {
			console.log(error);
		}
	};
};

// Gửi lời mời kết bạn
export const sendInvitationAction = (userId) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/friend-ship/send-invitation",
				method: "POST",
				data: {
					receive_user_id: userId,
				},
			});
			// console.log(res.data.content);
			dispatch({
				type: "otherUserStore/UPDATE_FRIENDSHIP_STATUS",
				payload: res.data.content,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

/////////////////////
// -------- POSTS -------

// Like bài viết của một user bất kì
export const otherUserLikePostAction = (postId) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/like/like-post",
				method: "POST",
				data: {
					post_id: postId,
				},
			});
			// return res.data.content;
			dispatch({
				type: "otherUserStore/UPDATE_LIKE_POSTS",
				payload: res.data.content,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Tạo comment cho bài posts
export const otherUserCreateCommentAction = (postId, textContent) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/comment/create-post-comment",
				method: "POST",
				data: {
					post_id: postId,
					content: textContent,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Lấy ra tất cả comment của posts
export const fetchAllCommentPostsAction = (postId) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: `/comment/get-all-post-comment/${postId}`,
				method: "GET",
			});
			return res.data.content;
		} catch (error) {
			console.log(error);
		}
	};
};
