import React, { useEffect, useState } from "react";
import "./FSAllFriend.scss";
import { useDispatch } from "react-redux";
import { fetchAllUserFriendAction } from "features/friend/friendAction";
import { Col, Input, Row, Select, Space, Spin } from "antd";
import { Avatar } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function FSAllFriend() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [friendList, setFriendList] = useState(null);

	// Call api lấy danh sách bạn bè
	const fetchAllMyFriend = async () => {
		const data = await dispatch(fetchAllUserFriendAction);
		setFriendList(data);
	};

	// search bar
	const [searchText, setSearchText] = useState("");
	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	// filter bar
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	// đến trang cá nhân của other user
	const goToOtherUserPage = (linkUrl) => {
		history.push(`/other-user/${linkUrl}`);
	};

	useEffect(() => {
		fetchAllMyFriend();
	}, []);

	if (!friendList)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return (
		<div id="FSAllFriend">
			<div className="friend-top">
				<div className="title">
					<span className="">Bạn bè</span>
					<span className="count-friend">{friendList.length}</span>
				</div>
				<div className="tool-bar">
					<div className="find-bar">
						<Input
							placeholder="Tìm kiếm"
							prefix={<SearchOutlined className="site-form-item-icon" />}
							onChange={handleSearch}
						/>
					</div>
					<div className="sort-bar">
						<Space wrap>
							<Select
								defaultValue="a-z"
								style={{
									width: 140,
								}}
								onChange={handleChange}
								options={[
									{
										value: "a-z",
										label: "Tên (A-Z)",
									},
									{
										value: "z-a",
										label: "Tên (Z-A)",
									},
								]}
								// suffixIcon={<ColumnHeightOutlined />}
							/>
						</Space>
					</div>
					<div className="filter-bar">
						<Space wrap>
							<Select
								defaultValue="all"
								style={{
									width: 220,
								}}
								onChange={handleChange}
								options={[
									{
										value: "all",
										label: "Tất cả",
									},
									{
										value: "family",
										label: "Gia đình",
									},
									{
										value: "colleague",
										label: "Đồng nghiệp",
									},
									{
										value: "customer",
										label: "Khách hàng",
									},
								]}
								// suffixIcon={<ColumnHeightOutlined />}
							/>
						</Space>
					</div>
				</div>
			</div>

			<div className="container">
				{friendList.map((item, index) => {
					return (
						<div key={index} className="col-box">
							<div className="friend-block">
								<div className="more-option">
									<i className="fa-solid fa-ellipsis fa-lg"></i>
								</div>
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
										<div className="btn-send-message">Nhắn tin</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FSAllFriend;
