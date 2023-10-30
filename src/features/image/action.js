import instance from "api/instance";

// fetch album cá nhân
export const fetchMyAlbumAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/image-list/get-all-image-list",
			method: "GET",
		});
		// console.log(res.data.content);
		dispatch({
			type: "imageStore/SET_MY_ALBUM",
			payload: res.data.content,
		});
	} catch (error) {
		console.log(error);
	}
};
