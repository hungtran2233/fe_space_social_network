import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8080/api/",
	timeout: 10000,
});

// interceptor;
instance.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers = { ...config.headers, Authorization: "Bearer " + token };
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// instance.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;

// 		if (error.response && error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			// Call your refresh token API endpoint here
// 			// const refreshedToken = await callRefreshTokenAPI();

// 			if (refreshedToken) {
// 				localStorage.setItem("token", refreshedToken);

// 				// Update the request header with the new token
// 				originalRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;

// 				return instance(originalRequest);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default instance;
