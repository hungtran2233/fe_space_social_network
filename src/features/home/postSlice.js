import { produce } from "immer";

const initialState = {
	allPost: [],
	myPost: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "postStore/SET_ALL_POST":
			const nextPost = produce(state, (draft) => {
				draft.allPost = action.payload;
			});
			return nextPost;

		case "postStore/SET_MY_POST":
			const nextMyPost = produce(state, (draft) => {
				draft.myPost = action.payload;
			});
			return nextMyPost;

		////////////////
		// ---- Tôi tương tác với bài viết của tôi hoặc của người khác -----

		// Like bài viết
		case "postStore/SET_MY_LIKE_FOR_POST":
			const test = produce(state, (draft) => {
				return draft.allPost;
			});
			// console.log(test);

			return produce(state, (draft) => {
				// console.log(draft);
				// payload có dạng: {user_id: 1, post_id: 1, isLike: true }
				const { user_id, post_id, isLike } = action.payload;
				// Tìm kiếm bài viết trong mảng otherUserPosts
				const likedPostIndex = draft.allPost.findIndex(
					(post) => post.post_id === post_id
				);
				if (likedPostIndex !== -1) {
					// Bài viết được tìm thấy
					const likedPost = draft.allPost[likedPostIndex];
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
					draft.allPost[likedPostIndex] = likedPost;
				}
			});

		default:
			return state;
	}
};

export default reducer;
