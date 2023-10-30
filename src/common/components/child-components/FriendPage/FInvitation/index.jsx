import { Spin, Card, Button, message, Space } from "antd";
import {
	acceptInvitationAction,
	deleteInvitationAction,
	fetchAllInvitationAction,
} from "features/authentication/action";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./FInvitation.scss";

const { Meta } = Card;

function FInvitation() {
	const dispatch = useDispatch();
	const allInvitation = useSelector((state) => state.auth.friendInvitation);
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

	const renderInvitation = (allInvitation) => {
		if (allInvitation.length === 0) {
			return "Không có lời mời nào";
		} else {
			return allInvitation.map((item, index) => {
				// khai báo biến trạng thái để kiểm tra xem userId có nằm trong mảng acceptedInvitations hay không
				const isAccepted = acceptedInvitations.includes(item.user_id);
				return (
					<div className="card-item" key={index}>
						{contextHolder}
						<div className="content-card">
							<div
								className="top"
								onClick={() => goToOtherUserPage(item.link_url)}
							>
								<img
									src={`http://localhost:8080/${item.avatar}`}
									alt="avatar"
								/>
							</div>
							<div className="middle">
								<span>{item.full_name}</span>
							</div>
							<div className="bottom">
								{isAccepted ? (
									<span>Đã chấp nhận lời mời kết bạn</span>
								) : (
									<>
										<Button
											type="primary"
											onClick={() => acceptInvitation(item.user_id)}
										>
											Chấp nhận
										</Button>
										<Button
											type="primary"
											danger
											style={{ width: 100 }}
											onClick={() => deleteInvitation(item.user_id)}
										>
											Xóa
										</Button>
									</>
								)}
							</div>
						</div>
					</div>
				);
			});
		}
	};

	return (
		<div id="FInvitation">
			<div className="title">Lời mời kết bạn</div>
			<div className="container">{renderInvitation(allInvitation)}</div>
		</div>
	);
}

export default FInvitation;
