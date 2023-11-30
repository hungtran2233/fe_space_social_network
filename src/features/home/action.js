import instance from "api/instance";
import axios from "axios";

// fetch all Post (lấy tất cả post của tất cả user)
export const fetchPostAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/post/get-all-post",
			method: "GET",
		});
		// console.log(res.data);
		dispatch({
			type: "postStore/SET_ALL_POST",
			payload: res.data.content,
		});
	} catch (error) {
		console.log(error);
	}
};

// fetch post cá nhân
export const fetchAllMyPostAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/post/get-all-post-personal",
			method: "GET",
		});
		dispatch({
			type: "postStore/SET_MY_POST",
			payload: res.data.content,
		});
	} catch (error) {
		console.log(error);
	}
};

// Like post
export const fetchLikePostAction = (postId) => {
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
		} catch (error) {
			console.log(error);
		}
	};
};

// Tạo comment
export const createCommentAction = async (postId, textContent) => {
	try {
		const res = await instance.request({
			url: "/comment/create-post-comment",
			method: "POST",
			data: {
				post_id: postId,
				content: textContent,
			},
		});
		console.log(res.data.content);
		return res.data.content;
	} catch (error) {
		console.log(error);
	}
};

// Xóa post
export const deletePostAction = async (postId) => {
	try {
		const res = await instance.request({
			url: `/post/remove-post/${postId}`,
			method: "PUT",
		});
	} catch (error) {
		console.log(error);
	}
};

// Create post
export const createPostAction = (
	valueContent,
	valuePrivacy,
	selectedFiles,
	valueVideoUrl
) => {
	return async (dispatch) => {
		try {
			// Lấy các giá trị để đăng bài
			const token = localStorage.getItem("token");
			const headersData = {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`, // Thêm token vào header
			};
			const formData = new FormData();
			// Thêm các trường dữ liệu vào formData
			formData.append("content", valueContent);
			formData.append("privacy", valuePrivacy);
			formData.append("video_url", valueVideoUrl);

			// Thêm các tệp vào formData
			selectedFiles.forEach((file) => {
				formData.append("files", file.originFileObj);
			});

			// Gửi yêu cầu POST đến máy chủ
			const res = await axios.post(
				"http://localhost:8080/api/post/create-post",
				formData,
				{
					headers: headersData,
				}
			);

			console.log("Kết quả từ máy chủ:", res.data.content);
		} catch (error) {
			console.error("Lỗi khi gửi yêu cầu:", error);
		}
	};
};
