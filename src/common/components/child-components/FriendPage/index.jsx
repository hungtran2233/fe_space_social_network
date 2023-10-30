import React, { useEffect, useState } from "react";
import "./FriendPage.scss";
import { useDispatch, useSelector } from "react-redux";

import { Layout, Menu, Spin, theme } from "antd";
import {
	fetchAllInvitationAction,
	fetchAllUserFriendAction,
} from "features/authentication/action";
import { StarOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import FInvitation from "./FInvitation";
import PFriend from "features/home/pages/Profile/components/ProfileContent/PFriend";

const { Header, Sider, Content } = Layout;

function FriendPage() {
	const dispatch = useDispatch();
	// const allFriendUser = useSelector((state) => state.auth.friend);

	const [collapsed, setCollapsed] = useState(false);
	const [selectedMenuKey, setSelectedMenuKey] = useState("item-1");
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	// // Lấy tất cả bạn bè
	// const fetchAllFriendUser = () => {
	// 	dispatch(fetchAllUserFriendAction);
	// };

	// useEffect(() => {
	// 	fetchAllFriendUser();
	// }, []);

	// if (!allFriendUser)
	// 	return (
	// 		<div style={{ textAlign: "center" }}>
	// 			<Spin size="middle" />;
	// 		</div>
	// 	);

	return (
		<div id="FriendPage">
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
					theme="light"
					width={300}
				>
					<div className="demo-logo-vertical" />
					<Menu
						mode="inline"
						defaultSelectedKeys={["1"]}
						selectedKeys={[selectedMenuKey]}
						onSelect={({ key }) => setSelectedMenuKey(key)}
						items={[
							{
								key: "item-1",
								icon: <UserAddOutlined />,
								label: "Lời mời kết bạn",
							},
							{
								key: "item-2",
								icon: <StarOutlined />,
								label: "Gợi ý",
							},
							{
								key: "item-3",
								icon: <TeamOutlined />,
								label: "Tất cả bạn bè",
							},
						]}
					/>
				</Sider>
				<Layout>
					<Content
						style={{
							minHeight: 280,
							background: colorBgContainer,
						}}
					>
						{/* Tổng quan  */}
						{selectedMenuKey === "item-1" && <FInvitation />}

						{/* Học vấn  */}
						{selectedMenuKey === "item-2" && "gợi ý"}
						{/* Công việc hiện tại  */}
						{selectedMenuKey === "item-3" && <PFriend />}
						{/* Nơi sống  */}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}

export default FriendPage;
