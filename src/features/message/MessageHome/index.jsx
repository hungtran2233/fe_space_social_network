import React, { useEffect, useState } from "react";
import {
	CloseCircleOutlined,
	CommentOutlined,
	SearchOutlined,
	TeamOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Spin, Input, Modal, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	createGroupConversationAction,
	fetchAllUserAction,
	getAllConversationAction,
} from "../action";
import PersonalContent from "../components/PersonalContent";
import SendBox from "../components/SendBox";
import "./MessageHome.scss";
import { socket } from "app/Socket";

import instance from "api/instance";
import GroupContent from "../components/GroupContent";
import GroupIcon from "../components/GroupIcon";
import GroupHeader from "../components/GroupHeader";
import { fetchProfileAction } from "features/authentication/action";

const { Header, Sider, Content } = Layout;

function MessageHome() {
	const dispatch = useDispatch();
	const myInfo = useSelector((state) => state.auth.profile);
	const arrUser = useSelector((state) => state.messageStore.userList);
	const myGroups = useSelector((state) => state.messageStore.groupConversation);
	// Button tạo conversation
	const [isModalOpen, setIsModalOpen] = useState(false);
	// Tên conversation
	const [conversationName, setConversationName] = useState("");
	// Selected user
	const [selectedUsers, setSelectedUsers] = useState([]);

	// Lấy thông tin cá nhân
	const fetchProfile = async () => {
		dispatch(fetchProfileAction);
	};
	// Lấy thông tin của tất cả user
	const fetchAllUser = async () => {
		dispatch(fetchAllUserAction);
	};

	// Lấy thông tin của tất cả group chat
	const fetchConversation = async () => {
		dispatch(getAllConversationAction);
	};

	useEffect(() => {
		fetchProfile();
		fetchAllUser();
		fetchConversation();
	}, []);

	// Tạo conversation
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleConversationName = (e) => {
		setConversationName(e.target.value);
	};
	const handleOk = async () => {
		try {
			// Tạo group
			const arrUserId = selectedUsers.map((user) => user.user_id);
			await createGroupConversationAction(conversationName, arrUserId);
			// Sau khi tạo conversation thành công, chờ fetchConversation hoàn thành
			await fetchConversation();
			setSelectedUsers([]);
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error creating or fetching conversation:", error);
		}
	};
	const handleCancel = () => {
		setSelectedUsers([]);
		setIsModalOpen(false);
	};

	// Thuộc tính của Menu Ant-design
	const [collapsed, setCollapsed] = useState(false);
	const [selectedUserItem, setSelectedUserItem] = useState("");
	const [selectedTabs, setSelectedTabs] = useState("tab-2");
	const [selectedGroupItem, setSelectedGroupItem] = useState("");

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	//////////////
	if (!arrUser)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);
	if (!myInfo)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);
	if (!myGroups)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	////////////
	// join room khi click vào user -- trả về roomId (conversation_id), msg_message từ database
	const handleJoinRoom = async (selectedUserId) => {
		try {
			const dataReq = {
				user_id_1: myInfo.user_id,
				user_id_2: Number(selectedUserId),
			};
			const res = await instance.request({
				url: "/conversation/post-conversation-one-to-one",
				method: "POST",
				data: dataReq,
			});
			const roomIdDB = res.data.content;
			// console.log(res.data.content);
			localStorage.setItem("roomIdFromDB", roomIdDB);
			// join room
			socket.emit("joinRoom", String(roomIdDB));
			//
		} catch (error) {
			console.log(error);
		}
	};

	// Render item (bỏ chính mình ra khỏi danh sách)
	const renderItem = (user) => {
		let userItem = {
			key: user.user_id,
			icon: <img src={`http://localhost:8080/${user.avatar}`} alt="Avatar" />,
			label: user.full_name,
			onClick: () => handleJoinRoom(user.user_id),
		};
		if (user.is_online === true) {
			return { ...userItem, className: "is-online-status" };
		}
		return userItem;
	};

	// Join vào group
	const handleJoinGroup = (conversationId) => {
		localStorage.setItem("roomIdFromDB", conversationId);
		socket.emit("joinRoom", String(conversationId));
	};
	// Render group chat
	const renderGroup = (group) => {
		let groupItem = {
			key: group.conversation_id,
			icon: (
				<div className="item-group-header">
					<GroupIcon groupInfo={group} />
				</div>
			),
			label: group.conversation_name,
			onClick: () => handleJoinGroup(group.conversation_id),
		};
		return groupItem;
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

	// remove selected item
	const handleRemoveSelected = (userToRemove) => {
		setSelectedUsers((prevSelectedUser) =>
			prevSelectedUser.filter((user) => user.user_id !== userToRemove.user_id)
		);
	};

	// userList ngoại trừ bản thân
	const newUserList = arrUser.filter((user) => user.user_id !== myInfo.user_id);

	// Tabs -- items
	const arrItem = [
		{
			key: "tab-1",
			label: (
				<span>
					{" "}
					<CommentOutlined />
					Cá nhân
				</span>
			),
			children: (
				<Menu
					className="menu-sider"
					theme="dark"
					mode="inline"
					selectedKeys={[selectedUserItem]}
					onSelect={({ key }) => setSelectedUserItem(key)}
					items={newUserList.map((user) => renderItem(user))}
				/>
			),
		},
		{
			key: "tab-2",
			label: (
				<span>
					<TeamOutlined /> Nhóm
				</span>
			),
			children: (
				<Menu
					className="menu-sider-group"
					theme="dark"
					mode="inline"
					selectedKeys={[selectedGroupItem]}
					onSelect={({ key }) => setSelectedGroupItem(key)}
					items={myGroups.map((group) => renderGroup(group))}
				/>
			),
		},
	];

	// Tabs -- onChange
	const handleOnChange = (key) => {
		setSelectedTabs(key);
		setSelectedUserItem("");
		setSelectedGroupItem("");
	};

	////////////////////////////
	////////////////////////////

	return (
		<div id="MessageHome">
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
					width={300}
					className="custom-sider"
				>
					{/* <div className="demo-logo-vertical" /> */}
					<div className="top-sider">
						<div className="search-box">
							<Input
								placeholder="Tìm kiếm "
								prefix={<SearchOutlined className="search-icon" />}
							/>
						</div>
						<div className="add-button" onClick={showModal}>
							<UsergroupAddOutlined style={{ fontSize: "24px" }} />
						</div>
						<Modal
							title="Tạo nhóm mới"
							open={isModalOpen}
							onOk={handleOk}
							onCancel={handleCancel}
						>
							<div className="modal-content">
								<div className="conversation-name">
									<Input
										placeholder="Nhập tên nhóm"
										onChange={handleConversationName}
									/>
								</div>
								<p>Thêm bạn vào nhóm</p>
								<div className="add-user">
									<Input placeholder="Nhập tên bạn bè của bạn" />
								</div>
								<div className="modal-user-list">
									<div className="left">
										{newUserList.map((user) => {
											return (
												<label
													key={user.user_id}
													htmlFor={user.user_id}
												>
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
													<span className="top-left">
														Đã chọn
													</span>
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
					</div>

					{/* End top-sider   */}

					<div className="custom-tabs">
						<Tabs
							tabBarStyle={{
								color: "white",
								paddingLeft: 20,
								fontWeight: "bold",
							}}
							defaultActiveKey="tab-2"
							items={arrItem}
							onChange={handleOnChange}
						/>
					</div>

					<div className="bot-sider"></div>
				</Sider>
				<Layout className="layout-content-custom">
					{selectedTabs === "tab-1" && (
						<>
							<Header
								style={{
									padding: 0,
									background: colorBgContainer,
									display: "flex",
								}}
							>
								<Content>
									{arrUser.map((i) => {
										if (selectedUserItem === String(i.user_id)) {
											return (
												<div
													key={i.user_id}
													className="personal-header"
												>
													{i.is_online === true ? (
														<div className="user-avatar is-online-header">
															<img
																src={`http://localhost:8080/${i.avatar}`}
																alt="avatar"
															/>
														</div>
													) : (
														<div className="user-avatar">
															<img
																src={`http://localhost:8080/${i.avatar}`}
																alt="avatar"
															/>
														</div>
													)}
													<div className="user-info">
														<div className="user-full-name">
															{i.full_name}
														</div>
														<div className="user-status">
															{i.is_online === true
																? "Đang hoạt động"
																: "Offline"}
														</div>
													</div>
												</div>
											);
										} else {
											return "";
										}
									})}
								</Content>
							</Header>
							<Content style={{ background: "white" }}>
								{selectedUserItem === "" ? (
									<div style={{ margin: 30 }}>
										Trang nhắn tin cá nhân
									</div>
								) : (
									""
								)}

								{arrUser.map((i) => {
									if (selectedUserItem === String(i.user_id)) {
										return (
											<div
												key={i.user_id}
												className="right-layout-content"
											>
												<PersonalContent
													userList={i}
													myInfo={myInfo}
												/>
												<SendBox userList={i} myInfo={myInfo} />
											</div>
										);
									} else {
										return "";
									}
								})}
							</Content>
						</>
					)}

					{/* tab nhóm  */}
					{selectedTabs === "tab-2" && (
						<>
							<Header
								style={{
									padding: 0,
									background: colorBgContainer,
									display: "flex",
								}}
							>
								<Content>
									{myGroups.map((i) => {
										if (
											selectedGroupItem ===
											String(i.conversation_id)
										) {
											return (
												<GroupHeader
													key={i.conversation_id}
													groupInfo={i}
													arrUser={arrUser}
												/>
											);
										} else {
											return "";
										}
									})}
								</Content>
							</Header>
							<Content style={{ background: "white" }}>
								{selectedGroupItem === "" ? (
									<div style={{ margin: 30 }}>Trang nhắn tin nhóm</div>
								) : (
									""
								)}

								{myGroups.map((i) => {
									if (selectedGroupItem === String(i.conversation_id)) {
										return (
											<div
												key={i.conversation_id}
												className="right-layout-content"
											>
												<GroupContent
													conversationInfo={i}
													userList={arrUser}
													myInfo={myInfo}
												/>
												<SendBox
													conversationInfo={i}
													userList={arrUser}
													myInfo={myInfo}
												/>
											</div>
										);
									} else {
										return "";
									}
								})}
							</Content>
						</>
					)}
				</Layout>
			</Layout>
		</div>
	);
}

export default MessageHome;
