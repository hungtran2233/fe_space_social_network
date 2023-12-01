import instance from "api/instance";
import axios from "axios";

//
// Lấy tất cả news của bạn bè và chính mình
export const fetchAllNewsAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/news/get-all-news",
			method: "GET",
		});
		// console.log(res.data);
		dispatch({
			type: "postStore/SET_ALL_NEWS",
			payload: res.data.content,
		});
	} catch (error) {
		console.log(error);
	}
};

// create news - type img
export const createNewsTypeImgAction = (fileList, valueMusicUrl, valuePrivacy) => {
	return async (dispatch) => {
		try {
			// console.log(fileList);
			// console.log(valueMusicUrl);
			// console.log(typeof valuePrivacy);

			const myToken = localStorage.getItem("token");

			const headersData = {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${myToken}`, // Thêm token vào header
			};

			const formData = new FormData();
			// Thêm các trường dữ liệu vào formData (vì fileList đang là một mảng nên ta phải lấy phần tử đầu tiên)
			formData.append("file", fileList[0].originFileObj);
			formData.append("news_content", "");
			formData.append("music_url", valueMusicUrl);
			formData.append("privacy_id", valuePrivacy);

			// kiểm tra file trong formData
			// console.log(formData.get("file"));

			// Gửi yêu cầu POST đến máy chủ
			const res = await axios.post(
				"http://localhost:8080/api/news/create-news",
				formData,
				{
					headers: headersData,
				}
			);

			return res.data.content;
		} catch (error) {
			console.error("Lỗi khi gửi yêu cầu:", error);
		}
	};
};

////////////////////////////
// create news - type text
export const createNewsTypeTextAction = (
	fileImg,
	valueNewsContent,
	valueMusicUrl,
	valuePrivacy
) => {
	return async (dispatch) => {
		try {
			// console.log(fileImg);
			// return;
			// console.log(valueMusicUrl);
			// console.log(typeof valuePrivacy);

			const myToken = localStorage.getItem("token");

			const headersData = {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${myToken}`, // Thêm token vào header
			};

			const formData = new FormData();
			formData.append("file", fileImg);
			formData.append("news_content", valueNewsContent);
			formData.append("music_url", valueMusicUrl);
			formData.append("privacy_id", valuePrivacy);

			// kiểm tra file trong formData
			// console.log(fileImg);
			// console.log(formData.get("file"));

			// Gửi yêu cầu POST đến máy chủ
			const res = await axios.post(
				"http://localhost:8080/api/news/create-news",
				formData,
				{
					headers: headersData,
				}
			);

			return res.data.content;
		} catch (error) {
			console.error("Lỗi khi gửi yêu cầu:", error);
		}
	};
};

/////////////
