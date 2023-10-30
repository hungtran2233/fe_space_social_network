import { Col, Row, Spin } from "antd";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import ProfileContent from "./components/ProfileContent";
import { fetchProfileAction } from "features/authentication/action";

function Profile() {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.auth.profile);
	// lấy ra link_url của mình
	const match = useRouteMatch();
	const linkUrl = match.params.link;

	// Lấy thông tin cá nhân
	const fetchProfile = async () => {
		dispatch(fetchProfileAction);
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	if (!profile)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	// Check link_url có đúng hay không
	const renderProfile = () => {
		if (profile.link_url !== linkUrl) {
			return <div>Không có thông tin</div>;
		}
		return (
			<>
				<Row justify="center">
					<Col span={16}>
						<ProfileContent profile={profile} />
					</Col>
				</Row>
			</>
		);
	};

	return <div id="Profile">{renderProfile()}</div>;
}

export default Profile;
