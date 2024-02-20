import Header from "common/components/Header";
import SignIn from "features/authentication/pages/SignIn";
import SignUp from "features/authentication/pages/SignUp";

import Profile from "features/home/pages/Profile";

import ImageHome from "features/image/pages/ImageHome";
import MessageHome from "features/message/MessageHome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./Guard";
import { fetchProfileAction } from "features/authentication/action";
import OtherUserProfile from "features/other-user-page/OtherUserProfile";
import CreateNewsPage from "features/home/pages/News/components/CreateNewsPage";
import HomeScreen from "features/home/HomeScreen";
import NewsScreen from "features/home/pages/News/NewsScreen";
import FriendScreen from "features/friend/FriendScreen";

import { io } from "socket.io-client";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProfileAction);
	}, []);

	return (
		<BrowserRouter>
			<Switch>
				<AuthRoute path="/sign-in" component={SignIn} redirectPath="/" />
				<AuthRoute path="/sign-up" component={SignUp} redirectPath="/" />

				<PrivateRouteWrapper />

				{/* Sidebar cho profile */}
			</Switch>
		</BrowserRouter>
	);
}

export default App;

///////////
function PrivateRouteWrapper() {
	// const dispatch = useDispatch();
	const [socket, setSocket] = useState(null);
	const userIdFromLocal = localStorage.getItem("user_id");

	// Khởi tạo state với giá trị ban đầu từ local
	const [userId, setUserId] = useState(userIdFromLocal);

	// Sử dụng useEffect để lắng nghe sự thay đổi trong local và cập nhật state
	useEffect(() => {
		setUserId(userIdFromLocal);
	}, [userIdFromLocal]); // Khi giá trị userIdFromLocal thay đổi, useEffect sẽ được gọi lại

	useEffect(() => {
		if (userId) {
			setSocket(io("http://localhost:8080"));
		}
	}, []);

	useEffect(() => {
		if (userId) {
			socket?.emit("newUserLogin", userId);
		}
	}, [socket]);

	return (
		<>
			<Header socket={socket} userId={userId} />
			<section style={{ marginTop: 75 }}>
				<Switch>
					{/* Page  news (Thêm exact để đảm bảo đường dẫn chính xác) */}
					<PrivateRoute
						path="/"
						component={HomeScreen}
						redirectPath="/sign-in"
						additionalProps={{ socket }}
						exact
					/>

					<PrivateRoute
						path="/news/"
						component={NewsScreen}
						redirectPath="/sign-in"
						exact
					/>

					<PrivateRoute
						path="/news/create"
						component={CreateNewsPage}
						redirectPath="/sign-in"
					/>

					<PrivateRoute
						path="/image-home"
						component={ImageHome}
						redirectPath="/sign-in"
					/>
					<PrivateRoute
						path="/message"
						component={MessageHome}
						redirectPath="/sign-in"
					/>
					<PrivateRoute
						path="/profile/:link"
						component={Profile}
						redirectPath="/sign-in"
						additionalProps={{ socket }}
					/>

					<PrivateRoute
						path="/other-user/:link"
						component={OtherUserProfile}
						redirectPath="/sign-in"
					/>

					<PrivateRoute
						path="/friend-page"
						component={FriendScreen}
						redirectPath="/sign-in"
					/>
				</Switch>
			</section>
		</>
	);
}
