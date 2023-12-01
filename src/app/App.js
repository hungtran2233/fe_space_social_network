import Header from "common/components/Header";
import SignIn from "features/authentication/pages/SignIn";
import SignUp from "features/authentication/pages/SignUp";

import Profile from "features/home/pages/Profile";

import ImageHome from "features/image/pages/ImageHome";
import MessageHome from "features/message/MessageHome";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./Guard";
import { fetchProfileAction } from "features/authentication/action";
import OtherUserProfile from "features/other-user-page/OtherUserProfile";
import FriendPage from "common/components/child-components/FriendPage";
import CreateNewsPage from "features/home/pages/News/components/CreateNewsPage";
import HomeScreen from "features/home/HomeScreen";
import NewsScreen from "features/home/pages/News/NewsScreen";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProfileAction);
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<AuthRoute path="/sign-in" component={SignIn} redirectPath="/" />
				<AuthRoute path="/sign-up" component={SignUp} redirectPath="/" />

				<PrivateRoute
					path="/"
					component={HomeScreen}
					redirectPath="/sign-in"
					exact
				/>

				{/* Page  news  */}
				<PrivateRoute
					path="/news"
					component={NewsScreen}
					redirectPath="/sign-in"
				/>

				{/* Page create news  */}
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
				/>

				<PrivateRoute
					path="/other-user/:link"
					component={OtherUserProfile}
					redirectPath="/sign-in"
				/>

				{/* // Trang bạn bè */}
				<PrivateRoute
					path="/friend-page"
					component={FriendPage}
					redirectPath="/sign-in"
				/>

				{/* Sidebar cho profile */}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
