import React, { useEffect } from "react";
import { Col, Row, Spin } from "antd";
import SidebarRight from "./components/SidebarRight";
import { useDispatch, useSelector } from "react-redux";
import News from "./components/News";
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

	// // Lấy thông tin cá nhân
	// const fetchProfile = async () => {
	// 	dispatch(fetchProfileAction);
	// };

	const fetchNews = async () => {
		dispatch(fetchNewsAction);
	};
	const fetchPost = async () => {
		dispatch(fetchPostAction);
	};

	useEffect(() => {
		// fetchProfile();
		fetchPost();
		fetchNews();
	}, []);

	if (!profile)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return (
		<div id="PostHome">
			<Row>
				<Col span={6}>
					<LeftSidebar profile={profile} />
				</Col>
				<Col span={12} className="post-home-center">
					<News />
				</Col>
				<Col span={6}>
					<SidebarRight />
				</Col>
			</Row>
		</div>
	);
}

export default PostHome;
