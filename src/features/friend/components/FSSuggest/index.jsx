import React, { useEffect, useState } from "react";
import "./FSSuggest.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Spin } from "antd";
import {
	fetchAllSuggestAction,
	sendFriendInvitationAction,
} from "features/friend/friendAction";
import { Avatar } from "@mui/material";

function FSSuggest() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [allSuggest, setAllSuggest] = useState(null);
	// trạng thái "đã gửi lời mời kết bạn"
	const [sentInvitationStatus, setSentInvitationStatus] = useState([]);

	// Call api lấy danh sách bạn bè
	const fetchAllSuggest = async () => {
		const data = await dispatch(fetchAllSuggestAction);
		setAllSuggest(data);
	};

	// đến trang cá nhân của other user
	const goToOtherUserPage = (linkUrl) => {
		history.push(`/other-user/${linkUrl}`);
	};

	// Call api - gửi lời mời kết bạn
	const sendFriendInvitation = (userId) => {
		dispatch(sendFriendInvitationAction(userId));
		setSentInvitationStatus([...sentInvitationStatus, userId]);
	};

	useEffect(() => {
		fetchAllSuggest();
	}, []);

	if (!allSuggest)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return (
		<div id="FSSuggest">
			<div className="title">Gợi ý kết bạn</div>
			<div className="container">
				{allSuggest.map((item, index) => {
					// khai báo biến trạng thái để kiểm tra xem userId có nằm trong mảng sentInvitationStatus hay không
					const isSend = sentInvitationStatus.includes(item.user_id);
					return (
						<div key={index} className="col-box">
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
											sx={{
												width: 78,
												height: 78,
												border: "1px solid #D8D8D8",
											}}
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

										<div className="mutual-friend">20 bạn chung</div>
									</div>
								</div>

								<div className="option">
									{isSend ? (
										<span className="btn-accepted">
											Đã gửi lời mời kết bạn
										</span>
									) : (
										<>
											<Button
												type="primary"
												onClick={() =>
													sendFriendInvitation(item.user_id)
												}
											>
												Thêm bạn bè
											</Button>
											<Button
												type="primary"
												danger
												style={{ width: "70px" }}
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

export default FSSuggest;
