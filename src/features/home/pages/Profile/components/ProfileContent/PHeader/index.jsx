import React from "react";
import "./PHeader.scss";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function PHeader(props) {
	const profile = props.profile;

	const myPost = useSelector((state) => state.postStore.myPost);

	return (
		<div id="PHeader">
			<div className="top">
				<div className="cover-image">
					<img
						src={
							profile.user_info.cover_image === null
								? `${process.env.PUBLIC_URL}/image/default-cover-image-1.jpg`
								: `http://localhost:8080/${profile.user_info.cover_image}`
						}
						alt="cover-image"
					/>
				</div>

				<div className="avatar">
					<img src={`http://localhost:8080/${profile.avatar}`} alt="" />
				</div>
			</div>

			<div className="profile-info">
				<div className="none-div"></div>
				<div className="info">
					<div className="full-name">{profile.full_name}</div>
					<div className="country">{profile.user_info.country}</div>
				</div>
				<div className="create-news">
					<Button type="primary" icon={<PlusOutlined />}>
						Tạo tin
					</Button>
				</div>
			</div>
		</div>
	);
}

export default PHeader;
