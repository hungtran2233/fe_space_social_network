import React, { useEffect } from "react";
import "./OUPHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Button, Spin } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import {
	CheckCircleOutlined,
	HourglassOutlined,
	MessageOutlined,
	StarOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	fetchFriendShipStatusAction,
	sendInvitationAction,
} from "features/other-user-page/otherUserAction";

function OUPHeader(props) {
	const dispatch = useDispatch();
	const otherUserInfo = props.otherUserInfo;

	// Tình trạng bạn bè của mình với đối phương
	const friendShipStatus = useSelector(
		(state) => state.otherUserStore.friendShipStatus
	);

	// Lấy link url
	const match = useRouteMatch();
	const linkUrl = match.params.link;

	// // Lấy thông tin về trạng thái mối quan hệ này
	const fetchFriendShipStatus = () => {
		dispatch(fetchFriendShipStatusAction(linkUrl));
	};

	useEffect(() => {
		fetchFriendShipStatus();
	}, []);

	if (friendShipStatus === null) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);
	}

	//
	const sendInvitation = () => {
		const userId = otherUserInfo.user_id;
		dispatch(sendInvitationAction(userId));
	};

	// render button friend ship status
	const renderFriendShipButton = () => {
		if (friendShipStatus === false) {
			return (
				<Button
					onClick={sendInvitation}
					type="primary"
					icon={<UserAddOutlined />}
				>
					Thêm bạn bè
				</Button>
			);
		} else {
			if (friendShipStatus.status === "accepted") {
				return <Button icon={<CheckCircleOutlined />}>Bạn bè</Button>;
			} else if (friendShipStatus.status === "pending") {
				return <Button icon={<HourglassOutlined />}>Đang chờ phản hồi</Button>;
			}
		}
	};

	// render button follow
	const renderFollowButton = () => {
		if (friendShipStatus === false) {
			return (
				<Button type="primary" icon={<StarOutlined />}>
					Theo dõi
				</Button>
			);
		} else {
			if (friendShipStatus.status === "accepted") {
				return <Button icon={<CheckCircleOutlined />}>Đang theo dõi</Button>;
			} else if (friendShipStatus.status === "pending") {
				return <Button icon={<StarOutlined />}>Theo dõi</Button>;
			}
		}
	};

	return (
		<div id="OUPHeader">
			<div className="top">
				<div className="cover-image">
					<img
						src={
							otherUserInfo.user_info.cover_image === null
								? `${process.env.PUBLIC_URL}/image/default-cover-image-1.jpg`
								: `http://localhost:8080/${otherUserInfo.user_info.cover_image}`
						}
						alt="cover-image"
					/>
				</div>

				<div className="avatar">
					<img src={`http://localhost:8080/${otherUserInfo.avatar}`} alt="" />
				</div>

				<div className="action-bar"></div>
			</div>

			<div className="profile-info">
				<div className="none-div"></div>
				<div className="info">
					<div className="full-name">{otherUserInfo.full_name}</div>
					<div className="country">
						{otherUserInfo.user_info.country !== null
							? otherUserInfo.user_info.country
							: "Chưa cập nhật nơi sống"}
					</div>
				</div>

				<div className="friend-ship-content">
					<div className="friend-btn">{renderFriendShipButton()}</div>
					<div className="follow-btn">{renderFollowButton()}</div>
					<div className="send-message">
						<Button type="primary" icon={<MessageOutlined />}>
							Gửi tin nhắn
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OUPHeader;
