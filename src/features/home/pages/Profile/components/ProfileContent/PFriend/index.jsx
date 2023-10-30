import React, { useEffect, useState } from "react";
import "./PFriend.scss";
import { useDispatch, useSelector } from "react-redux";

import { Input, Select, Space, Spin } from "antd";
import {
	ColumnHeightOutlined,
	EllipsisOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAllUserFriendAction } from "features/authentication/action";

function PFriend() {
	const dispatch = useDispatch();
	const history = useHistory();
	const friendList = useSelector((state) => state.auth.friend);
	const fetchMyFriend = () => {
		dispatch(fetchAllUserFriendAction);
	};

	useEffect(() => {
		fetchMyFriend();
	}, []);

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

	// render friendList
	const renderFriendList = (friendList) => {
		// Lọc danh sách bạn bè dựa trên giá trị của ô input
		const filteredFriends = friendList.filter((friend) =>
			friend.full_name.toLowerCase().includes(searchText.toLowerCase())
		);

		return filteredFriends.map((item, index) => {
			return (
				<div className="friend-item" key={index}>
					<div
						onClick={() => {
							goToOtherUserPage(item.link_url);
						}}
						className="info"
					>
						<div className="avatar">
							<img
								src={`http://localhost:8080/${item.avatar}`}
								alt="avatar"
							/>
						</div>
						<div className="full-name">{item.full_name}</div>
					</div>

					<div className="option">
						<EllipsisOutlined style={{ fontSize: 28, fontWeight: 500 }} />
					</div>
				</div>
			);
		});
	};

	if (!friendList)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return (
		<div id="PFriend">
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
			<div className="friend-content">{renderFriendList(friendList)}</div>
		</div>
	);
}

export default PFriend;
