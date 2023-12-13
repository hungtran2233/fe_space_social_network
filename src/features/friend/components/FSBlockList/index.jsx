import { Button, Spin } from "antd";
import {
	fetchAllBlockedAction,
	removeBlockedUserAction,
} from "features/friend/friendAction";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./FSBlockList.scss";

function FSBlockList() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [allBlocked, setAllBlocked] = useState(null);

	// trạng thái "Đã bỏ chặn"
	const [removeBlockedStatus, setRemoveBlockedStatus] = useState([]);

	// Call api lấy danh sách hạn chế
	const fetchAllBlocked = async () => {
		const data = await dispatch(fetchAllBlockedAction);
		setAllBlocked(data);
	};

	// Bỏ chặn người dùng
	const removeBlockedUser = (otherUserId) => {
		dispatch(removeBlockedUserAction(otherUserId));
		setRemoveBlockedStatus([...removeBlockedStatus, otherUserId]);
	};

	// đến trang cá nhân của other user
	const goToOtherUserPage = (linkUrl) => {
		history.push(`/other-user/${linkUrl}`);
	};

	useEffect(() => {
		fetchAllBlocked();
	}, []);

	if (!allBlocked)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return (
		<div id="FSBlockList">
			<div className="title">Danh sách hạn chế</div>
			<div className="container">
				{allBlocked.map((item, index) => {
					const isBlock = removeBlockedStatus.includes(
						item.user_blocked_info.user_id
					);
					return (
						<div key={index} className="col-box">
							<div className="friend-block">
								<div className="content">
									<div
										className="avatar"
										onClick={() => {
											goToOtherUserPage(
												item.user_blocked_info.link_url
											);
										}}
									>
										<Avatar
											alt={item.user_blocked_info.full_name.toUpperCase()}
											src={`http://localhost:8080/${item.user_blocked_info.avatar}`}
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
													goToOtherUserPage(
														item.user_blocked_info.link_url
													);
												}}
											>
												{item.user_blocked_info.full_name}
											</div>
											<div className="country">
												{item.country === null
													? "Chưa có địa chỉ"
													: item.user_blocked_info.country}
											</div>
										</div>

										<div className="mutual-friend">20 bạn chung</div>
									</div>
								</div>

								<div className="option">
									{isBlock ? (
										<span className="btn-accepted">Đã bỏ chặn</span>
									) : (
										<Button
											type="primary"
											onClick={() =>
												removeBlockedUser(
													item.user_blocked_info.user_id
												)
											}
										>
											Bỏ chặn
										</Button>
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

export default FSBlockList;
