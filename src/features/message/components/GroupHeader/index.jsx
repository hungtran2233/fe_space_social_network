import React, { useState } from "react";
import "./GroupHeader.scss";
import {
	CloseCircleOutlined,
	InfoCircleOutlined,
	SearchOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Input, Modal, Tooltip } from "antd";
import { addMemberGroupAction, getAllConversationAction } from "features/message/action";
import { useDispatch } from "react-redux";

function GroupHeader(props) {
	const groupInfo = props.groupInfo;
	const arrUser = props.arrUser;
	const dispatch = useDispatch();
	// Lấy thông tin của tất cả group chat
	const fetchConversation = async () => {
		dispatch(getAllConversationAction);
	};
	const [selectedUsers, setSelectedUsers] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = async () => {
		try {
			// Tạo group
			const arrUserId = selectedUsers.map((user) => user.user_id);
			// Gọi action thêm thành viên
			await addMemberGroupAction(arrUserId, groupInfo.conversation_id);
			// fetch conversation để render lại giao diện
			await fetchConversation();
			//
			setSelectedUsers([]);
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error creating or fetching conversation:", error);
		}
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Selected user cho modal
	const handleToggleUser = (user) => {
		if (selectedUsers.includes(user)) {
			setSelectedUsers(
				selectedUsers.filter((selectedUser) => selectedUser !== user)
			);
		} else {
			setSelectedUsers([...selectedUsers, user]);
		}
	};
	// Xóa selected item
	const handleRemoveSelected = (userToRemove) => {
		setSelectedUsers((prevSelectedUser) =>
			prevSelectedUser.filter((user) => user.user_id !== userToRemove.user_id)
		);
	};

	const filteredUserList = arrUser.filter((user) => {
		return !groupInfo.members.some((member) => member.user_id === user.user_id);
	});

	return (
		<div id="GroupHeader">
			<div className="icon-container">
				{groupInfo.members.map((user) => {
					return (
						<div key={user.user_id} className="user-box">
							<img
								src={`http://localhost:8080/${user.avatar}`}
								alt="avatar"
							/>
						</div>
					);
				})}
			</div>
			<div className="group-info">
				<div className="name">{groupInfo.conversation_name}</div>
				<div className="count-members">
					<span>
						<UserOutlined />
					</span>
					<span className="count-info">
						{groupInfo.members.length + " thành viên"}
					</span>
				</div>
			</div>

			<div className="right-header">
				<span>
					<Tooltip title="Thêm thành viên">
						<UserAddOutlined onClick={showModal} />
					</Tooltip>
				</span>

				<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
					<div className="modal-content">
						<div className="conversation-name">
							<span style={{ fontSize: 22, fontWeight: "bold" }}>
								{groupInfo.conversation_name}
							</span>
						</div>
						<p>Thêm bạn vào nhóm</p>
						<div className="add-user">
							<Input placeholder="Nhập tên bạn bè của bạn" />
						</div>
						<div className="modal-user-list">
							<div className="left">
								{filteredUserList.map((user) => {
									return (
										<label key={user.user_id} htmlFor={user.user_id}>
											<div className="modal-user-item">
												<span className="tick-icon">
													<input
														type="checkbox"
														name="selected-user"
														id={user.user_id}
														onChange={() =>
															handleToggleUser(user)
														}
														checked={selectedUsers.includes(
															user
														)}
													/>
												</span>
												<span className="user-avatar">
													<img
														src={`http://localhost:8080/${user.avatar}`}
														alt=""
													/>
												</span>
												<span className="user-full-name">
													{user.full_name}
												</span>
											</div>
										</label>
									);
								})}
							</div>
							<div className="right">
								{selectedUsers.length > 0 && (
									<div className="selected-content">
										<div className="top">
											<span className="top-left">Đã chọn</span>
											<span className="top-right">
												{selectedUsers.length}/50
											</span>
										</div>

										<>
											{selectedUsers.map((selectedUser) => (
												<div
													key={selectedUser.user_id}
													className="box-item"
												>
													<span className="user-avatar">
														<img
															src={`http://localhost:8080/${selectedUser.avatar}`}
															alt=""
														/>
													</span>
													<span className="user-full-name">
														{selectedUser.full_name}
													</span>
													<span className="remove-item">
														<CloseCircleOutlined
															onClick={() =>
																handleRemoveSelected(
																	selectedUser
																)
															}
														/>
													</span>
												</div>
											))}
										</>
									</div>
								)}
							</div>
						</div>
					</div>
				</Modal>

				<span>
					<SearchOutlined />
				</span>
				<span>
					<InfoCircleOutlined />
				</span>
			</div>
		</div>
	);
}

export default GroupHeader;
