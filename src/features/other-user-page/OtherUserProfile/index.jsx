import { Col, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import {
	fetchFriendShipStatusAction,
	fetchOtherUserProfileAction,
} from "../otherUserAction";
import OUProfileContent from "./OUProfileContent";

function OtherUserProfile() {
	const dispatch = useDispatch();
	// Thông tin cá nhân của đối phương
	const otherUserInfo = useSelector((state) => state.otherUserStore.otherUserInfo);

	// lấy ra link_url trên đường dẫn
	const match = useRouteMatch();
	const linkUrl = match.params.link;

	// Lấy thông tin cá nhân của đối phương
	const fetchOtherUserProfile = () => {
		dispatch(fetchOtherUserProfileAction(linkUrl));
	};

	useEffect(() => {
		fetchOtherUserProfile();
	}, []);

	if (!otherUserInfo)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	// Check link_url có đúng hay không
	const renderProfile = () => {
		// if (profile.link_url !== linkUrl) {
		// 	return <div>Không có thông tin</div>;
		// }
		return (
			<Row justify="center">
				<Col span={16}>
					<OUProfileContent otherUserInfo={otherUserInfo} />
				</Col>
			</Row>
		);
	};

	return <div id="Profile">{renderProfile()}</div>;
}

export default OtherUserProfile;
