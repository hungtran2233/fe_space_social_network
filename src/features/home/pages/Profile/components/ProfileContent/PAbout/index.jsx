import React, { useState } from "react";
import "./PAbout.scss";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import BadgeIcon from "@mui/icons-material/Badge";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
///////
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";
import PrivacyBar from "common/components/PrivacyBar";
import MoreOption from "./EditFullName";
import EditAbout from "./EditFullName";
import EditFullName from "./EditFullName";
import EditGender from "./EditGender";
import ShareIcon from "@mui/icons-material/Share";
import EditUserLink from "./EditUserLink";
import EditAge from "./EditAge";
import EditSchool from "./EditSchool";
import EditWork from "./EditWork";
import EditCountry from "./EditCountry";
import EditFavorites from "./EditFavorites";

//////
const { Header, Sider, Content } = Layout;

function PAbout(props) {
	const profile = props.profile;

	//////
	const [collapsed, setCollapsed] = useState(false);
	const [selectedMenuKey, setSelectedMenuKey] = useState("item-1");
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	//
	const formatGender = (gender) => {
		if (gender === "male") {
			return "Nam";
		} else if (gender === "female") {
			return "Nữ";
		} else {
			return "Khác";
		}
	};
	return (
		<div id="AboutProfile">
			<Layout>
				<Sider trigger={null} collapsible collapsed={collapsed} theme="light">
					<div className="demo-logo-vertical" />
					<Menu
						mode="inline"
						defaultSelectedKeys={["1"]}
						selectedKeys={[selectedMenuKey]}
						onSelect={({ key }) => setSelectedMenuKey(key)}
						items={[
							{
								key: "item-1",
								// icon: <AccountCircleIcon sx={{ fontSize: 24 }} />,
								label: "Tổng quan",
							},
							{
								key: "item-2",
								// icon: <HistoryEduIcon />,
								label: "Học vấn",
							},
							{
								key: "item-3",
								// icon: <BadgeIcon />,
								label: "Công việc hiện tại",
							},

							{
								key: "item-4",
								// icon: <FmdGoodIcon />,
								label: "Nơi sống",
							},
							{
								key: "item-5",
								// icon: <AutoAwesomeIcon />,
								label: "Sở thích",
							},
							{
								key: "item-6",
								// icon: <ErrorOutlineIcon />,
								label: "Liên kết",
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
						{selectedMenuKey === "item-1" && (
							<div className="menu-item">
								<div className="email">
									<EmailIcon sx={{ fontSize: 26, color: "gray" }} />
									<span className="label">Địa chỉ email: </span>
									<span className="text-content">{profile.email}</span>
								</div>

								<div className="full-name">
									<BadgeIcon sx={{ fontSize: 26, color: "gray" }} />
									<span className="label">Họ tên:</span>
									<span className="text-content">
										{profile.full_name}
									</span>

									<span className="container-option">
										<EditFullName profile={profile} />
									</span>
								</div>

								<div className="gender">
									<WcIcon sx={{ fontSize: 26, color: "gray" }} />
									<span className="label">Giới tính:</span>
									<span className="text-content">
										{profile.user_info.gender !== null
											? formatGender(profile.user_info.gender)
											: "Chưa có thông tin"}
									</span>

									<span className="container-option">
										<EditGender profile={profile} />
									</span>
								</div>
								<div className="age">
									<CakeIcon sx={{ fontSize: 26, color: "gray" }} />
									<span className="label">Tuổi:</span>
									<span className="text-content">
										{profile.user_info.age !== null
											? profile.user_info.age
											: "Chưa có"}
									</span>
									<span className="container-option">
										<EditAge profile={profile} />
									</span>
								</div>
							</div>
						)}

						{/* Học vấn  */}
						{selectedMenuKey === "item-2" && <EditSchool profile={profile} />}
						{/* Công việc hiện tại  */}
						{selectedMenuKey === "item-3" && <EditWork profile={profile} />}
						{/* Nơi sống  */}
						{selectedMenuKey === "item-4" && (
							<EditCountry profile={profile} />
						)}
						{/* Sở thích  */}
						{selectedMenuKey === "item-5" && (
							<EditFavorites profile={profile} />
						)}
						{/* Thông tin khác  */}
						{selectedMenuKey === "item-6" && (
							<div className="menu-item">
								<div className="user-link">
									<ShareIcon sx={{ fontSize: 26, color: "gray" }} />
									<span className="label">Liên kết cá nhân:</span>
									<span className="text-content">
										{`http://localhost:3000/profile/${profile.link_url}`}
									</span>

									<span className="container-option">
										<EditUserLink profile={profile} />
									</span>
								</div>
							</div>
						)}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}

export default PAbout;
