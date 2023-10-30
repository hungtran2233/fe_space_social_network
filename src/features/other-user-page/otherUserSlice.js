import { produce } from "immer";

const initialState = {
	otherUserInfo: null,
	otherUserPosts: [],
	otherUserImageList: null,
	friendShipStatus: null,
	otherUserAllFriend: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// set user info, posts, image list
		case "otherUserStore/SET_TOTAL_INFO_OTHER_USER":
			return produce(state, (draft) => {
				// Set user info
				const { user_id, email, full_name, avatar, link_url, user_info } =
					action.payload;
				const userInfo = {
					user_id,
					email,
					full_name,
					avatar,
					link_url,
					user_info,
				};
				draft.otherUserInfo = userInfo;

				// Set posts
				const { post } = action.payload;
				draft.otherUserPosts = post;

				// Set image list
				const { image_list } = action.payload;
				draft.otherUserImageList = image_list;
			});

		// Like posts
		case "otherUserStore/UPDATE_LIKE_POSTS":
			return produce(state, (draft) => {
				const { user_id, post_id, isLike } = action.payload;
				// Tìm kiếm bài viết trong mảng otherUserPosts
				const likedPostIndex = draft.otherUserPosts.findIndex(
					(post) => post.post_id === post_id
				);
				if (likedPostIndex !== -1) {
					// Bài viết được tìm thấy
					const likedPost = draft.otherUserPosts[likedPostIndex];
					// Cập nhật số lượng phần tử trong post_like
					if (isLike) {
						// Thêm user_id vào mảng post_like
						likedPost.post_like.push({ user_id: user_id });
					} else {
						// Loại bỏ user_id khỏi mảng post_like
						likedPost.post_like = likedPost.post_like.filter(
							(item) => item.user_id !== user_id
						);
					}

					// Cập nhật mảng otherUserPosts
					draft.otherUserPosts[likedPostIndex] = likedPost;
				}
			});

		// Comment cho posts

		// mối quan hệ bạn bè giữa mình với đối phương
		case "otherUserStore/SET_FRIENDSHIP_STATUS":
			return produce(state, (draft) => {
				draft.friendShipStatus = action.payload;
			});

		case "otherUserStore/UPDATE_FRIENDSHIP_STATUS":
			return produce(state, (draft) => {
				draft.friendShipStatus = action.payload;
			});

		default:
			return state;
	}
};

export default reducer;
