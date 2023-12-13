import { produce } from "immer";

const initialState = {
	profile: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// đăng nhập -> set profile
		case "auth/SET_PROFILE":
			return produce(state, (draft) => {
				draft.profile = action.payload;
			});

		// đăng xuất -> set profile = null
		case "auth/LOGOUT_PROFILE":
			return produce(state, (draft) => {
				draft.profile = action.payload;
			});

		// cập nhật họ tên
		case "auth/UPDATE_FULL_NAME":
			return produce(state, (draft) => {
				draft.profile.full_name = action.payload;
			});

		// cập nhật giới tính
		case "auth/UPDATE_GENDER":
			return produce(state, (draft) => {
				draft.profile.user_info.gender = action.payload;
			});

		// cập nhật tuổi
		case "auth/UPDATE_AGE":
			return produce(state, (draft) => {
				draft.profile.user_info.age = action.payload;
			});

		// cập nhật học vấn
		case "auth/UPDATE_SCHOOL":
			return produce(state, (draft) => {
				draft.profile.user_info.study_at = action.payload;
			});

		// cập nhật nơi làm việc
		case "auth/UPDATE_WORK":
			return produce(state, (draft) => {
				draft.profile.user_info.working_at = action.payload;
			});

		// cập nhật nơi sống
		case "auth/UPDATE_COUNTRY":
			return produce(state, (draft) => {
				draft.profile.user_info.country = action.payload;
			});

		// cập nhật sở thích
		case "auth/UPDATE_FAVORITES":
			return produce(state, (draft) => {
				draft.profile.user_info.favorites = action.payload;
			});

		//////////

		default:
			return state;
	}
};

export default reducer;
