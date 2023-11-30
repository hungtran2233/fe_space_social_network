import React, { useEffect } from "react";
import { Col, Row, Spin } from "antd";
import SidebarRight from "./components/SidebarRight";
import { useDispatch, useSelector } from "react-redux";
import News from "features/home/pages/News";
import "./PostHome.scss";
import {
	fetchNewsAction,
	fetchPostAction,
	fetchProfileAction,
} from "features/home/action";
import LeftSidebar from "./components/LeftSidebar";

function PostHome() {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.auth.profile);

	const fetchPost = async () => {
		dispatch(fetchPostAction);
	};

	useEffect(() => {
		// fetchProfile();
		fetchPost();
	}, []);

	if (!profile)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return <div id="Post"></div>;
}

export default PostHome;
