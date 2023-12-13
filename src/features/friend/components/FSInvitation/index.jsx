import { Spin, Card, Button, message, Space } from "antd";
import "./FSInvitation.scss";

import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	acceptInvitationAction,
	deleteInvitationAction,
	fetchAllInvitationAction,
} from "features/friend/friendAction";
import { Avatar } from "@mui/material";

const { Meta } = Card;

function FSInvitation() {
	const dispatch = useDispatch();
	const allInvitation = useSelector((state) => state.friendStore.friendInvitation);
	const history = useHistory();

	// trạng thái chấp nhận lời mời kết bạn
	const [acceptedInvitations, setAcceptedInvitations] = useState([]);

	// Lất tất cả lời mời kết bạn
	const fetchAllInvitation = () => {
		dispatch(fetchAllInvitationAction);
	};

	// Chấp nhận lời mời kết bạn
	const acceptInvitation = (userId) => {
		dispatch(acceptInvitationAction(userId));
		success();
		// thêm userId vào mảng acceptedInvitations
		setAcceptedInvitations([...acceptedInvitations, userId]);
	};
	// Thông báo chấp nhận thành công
	const [messageApi, contextHolder] = message.useMessage();
	const success = () => {
		messageApi.open({
			type: "success",
			content: "Chấp nhận lời mời kết bạn thành công !",
		});
	};

	// Xóa lời mời kết bạn
	const deleteInvitation = async (userId) => {
		await dispatch(deleteInvitationAction(userId));

		// render lại giao diện
		fetchAllInvitation();
	};

	useEffect(() => {
		// fetchAllFriendUser();
		fetchAllInvitation();
	}, []);

	if (!allInvitation) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);
	}

	// đến trang cá nhân của other user
	const goToOtherUserPage = (linkUrl) => {
		history.push(`/other-user/${linkUrl}`);
	};

	return (
		<div id="FSInvitation">
			<div className="title">Lời mời kết bạn</div>
			<div className="container">
				{allInvitation.map((item, index) => {
					// khai báo biến trạng thái để kiểm tra xem userId có nằm trong mảng acceptedInvitations hay không
					const isAccepted = acceptedInvitations.includes(item.user_id);
					return (
						<div key={index} className="col-box">
							{contextHolder}
							<div className="friend-block">
								<div className="content">
									<div
										className="avatar"
										onClick={() => {
											goToOtherUserPage(item.link_url);
										}}
									>
										<Avatar
											alt={item.full_name.toUpperCase()}
											src={`http://localhost:8080/${item.avatar}`}
											sx={{ width: 78, height: 78 }}
										/>
									</div>
									<div className="friend-meta">
										<div className="info">
											<div
												className="user-full-name"
												onClick={() => {
													goToOtherUserPage(item.link_url);
												}}
											>
												{item.full_name}
											</div>
											<div className="country">
												{item.country === null
													? "Chưa có địa chỉ"
													: item.country}
											</div>
										</div>

										<div className="mutual-friend">15 bạn chung</div>
									</div>
								</div>

								<div className="option">
									{isAccepted ? (
										<span className="btn-accepted">
											Đã chấp nhận kết bạn
										</span>
									) : (
										<>
											<Button
												type="primary"
												onClick={() =>
													acceptInvitation(item.user_id)
												}
											>
												Chấp nhận
											</Button>
											<Button
												type="primary"
												danger
												style={{ width: "80px" }}
												onClick={() =>
													deleteInvitation(item.user_id)
												}
											>
												Xóa
											</Button>
										</>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FSInvitation;
