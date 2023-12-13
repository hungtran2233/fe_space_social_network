import React, { useEffect, useState } from "react";
import "./FriendScreen.scss";
import { useDispatch, useSelector } from "react-redux";

import { ConfigProvider, Layout, Menu, Spin, theme } from "antd";
import {
	fetchAllInvitationAction,
	fetchAllUserFriendAction,
} from "features/authentication/action";
import {
	LockOutlined,
	StarOutlined,
	TeamOutlined,
	UserAddOutlined,
} from "@ant-design/icons";

import FSInvitation from "../components/FSInvitation";
import FSAllFriend from "../components/FSAllFriend";
import FSSuggest from "../components/FSSuggest";
import FSBlockList from "../components/FSBlockList";

const { Header, Sider, Content } = Layout;

function FriendScreen() {
	// Tab của antd
	const [collapsed, setCollapsed] = useState(false);
	const [selectedMenuKey, setSelectedMenuKey] = useState("item-1");
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<div id="FriendScreen">
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
					theme="light"
					width={300}
				>
					<div className="demo-logo-vertical" />

					<ConfigProvider
						theme={{
							components: {
								Menu: {
									itemSelectedBg: "#E6E6E6",
								},
							},
						}}
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={["1"]}
							selectedKeys={[selectedMenuKey]}
							onSelect={({ key }) => setSelectedMenuKey(key)}
							items={[
								{
									key: "item-1",
									icon: <UserAddOutlined />,
									label: "Tất cả bạn bè",
								},
								{
									key: "item-2",
									icon: <StarOutlined />,
									label: "Lời mời kết bạn",
								},
								{
									key: "item-3",
									icon: <TeamOutlined />,
									label: "Gợi ý bạn bè",
								},
								{
									key: "item-4",
									icon: <LockOutlined />,
									label: "Danh sách hạn chế",
								},
							]}
						/>
					</ConfigProvider>
				</Sider>
				<Layout>
					<Content
						style={{
							minHeight: 280,
							background: colorBgContainer,
						}}
					>
						{/* Tất cả bạn bè  */}
						{selectedMenuKey === "item-1" && <FSAllFriend />}

						{/* Lời mời kết bạn  */}
						{selectedMenuKey === "item-2" && <FSInvitation />}
						{/* Gợi ý bạn bè */}
						{selectedMenuKey === "item-3" && <FSSuggest />}
						{/* Danh sách hạn chế  */}
						{selectedMenuKey === "item-4" && <FSBlockList />}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}

export default FriendScreen;
