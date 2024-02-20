import { Col, Row, Spin } from "antd";
import "./HomeScreen.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import News from "../pages/News";
import PostContainer from "../pages/Post";

function HomeScreen(props) {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.auth.profile);

	if (!profile)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return (
		<Row>
			{/* {console.log(props.socket)} */}
			<Col span={6}>
				<LeftSidebar profile={profile} />
			</Col>
			<Col span={12} className="post-home-center">
				<News />

				<PostContainer profile={profile} socket={props.socket} />
			</Col>
			<Col span={6}>
				<RightSidebar />
			</Col>
		</Row>
	);
}

export default HomeScreen;
