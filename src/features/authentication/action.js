import instance from "api/instance";

// đăng nhập
export const signInAction = (userLoginType) => {
	// console.log(userLoginType);
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/auth/login",
				method: "POST",
				data: userLoginType,
			});
			const token = res.data.content.token;
			// Lưu token xuông local
			localStorage.setItem("token", token);
			localStorage.setItem("login", true);
			return token;
		} catch (error) {
			console.log(error);
		}
	};
};

// fetch profile
export const fetchProfileAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/auth/get-user-info",
			method: "GET",
		});
		// console.log(res.data);
		dispatch({
			type: "auth/SET_PROFILE",
			payload: res.data.content,
		});
	} catch (error) {
		// console.log(error);
	}
};

// logout
export const logoutProfileAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/auth/logout",
			method: "POST",
		});
	} catch (error) {
		// console.log(error);
	}
};

//// EDIT --- user, user_info
// edit full_name
export const updateFullNameAction = (valueInput) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/auth/update-user-info",
				method: "PUT",
				data: {
					full_name: valueInput,
				},
			});

			dispatch({
				type: "auth/UPDATE_FULL_NAME",
				payload: res.data.content.full_name,
			});
		} catch (error) {
			console.log(error);
		}
	};
};
// edit gender
export const updateGenderAction = (valueGender) => {
	// console.log(valueGender);
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/auth/update-user-info",
				method: "PUT",
				data: {
					gender: valueGender,
				},
			});
			// console.log(res.data.content.user_info.gender);
			dispatch({
				type: "auth/UPDATE_GENDER",
				payload: res.data.content.user_info.gender,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// edit Age
export const updateAgeAction = (valueAge) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/auth/update-user-info",
				method: "PUT",
				data: {
					age: Number(valueAge),
				},
			});

			dispatch({
				type: "auth/UPDATE_AGE",
				payload: res.data.content.user_info.age,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// edit school
export const updateSchoolAction = (valueInput) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/auth/update-user-info",
				method: "PUT",
				data: {
					study_at: valueInput,
				},
			});

			dispatch({
				type: "auth/UPDATE_SCHOOL",
				payload: res.data.content.user_info.study_at,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// edit work
export const updateWorkAction = (valueInput) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/auth/update-user-info",
				method: "PUT",
				data: {
					working_at: valueInput,
				},
			});

			dispatch({
				type: "auth/UPDATE_WORK",
				payload: res.data.content.user_info.working_at,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// edit country
export const updateCountryAction = (valueInput) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/auth/update-user-info",
				method: "PUT",
				data: {
					country: valueInput,
				},
			});

			dispatch({
				type: "auth/UPDATE_COUNTRY",
				payload: res.data.content.user_info.country,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// edit favorites
export const updateFavoritesAction = (valueInput) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/auth/update-user-info",
				method: "PUT",
				data: {
					favorites: valueInput,
				},
			});

			dispatch({
				type: "auth/UPDATE_FAVORITES",
				payload: res.data.content.user_info.favorites,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

///// END -- EDIT PROFILE

// Lấy danh sách bạn bè
export const fetchAllUserFriendAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/friend-ship/show-all-friends",
			method: "GET",
		});
		dispatch({
			type: "auth/SET_FRIEND",
			payload: res.data.content,
		});
	} catch (error) {
		console.log(error);
	}
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
