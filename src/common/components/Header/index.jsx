import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Input, Popover, Space } from "antd";
import { Avatar } from "@mui/material";
import {
	BellOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	LogoutOutlined,
	MessageOutlined,
	PictureOutlined,
	SearchOutlined,
	SettingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { logoutProfileAction } from "features/authentication/action";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PhotoIcon from "@mui/icons-material/Photo";
import MessageIcon from "@mui/icons-material/Message";
import PublicIcon from "@mui/icons-material/Public";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { io } from "socket.io-client";
import AddFriendNotification from "./components/AddFriendNotification";
import AllEventNotification from "./components/AllEventNotification";

function Header(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const profile = useSelector((state) => state.auth.profile);
	const socket = props.socket;

	// Notification
	const [notifications, setNotifications] = useState([]);
	useEffect(() => {
		socket?.on("getNotificationFromPost", (data) => {
			setNotifications((prev) => [...prev, data]);
		});
	}, [socket]);

	/////////////////////////////////

	const goToHome = () => {
		history.push("/");
	};

	// Đăng xuất - Call api đăng xuất
	const logout = () => {
		Swal.fire({
			title: "Bạn có muốn đăng xuất không ?",
			icon: "info",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Hủy",
			confirmButtonText: "Đăng xuất!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Đăng xuất thành công !",
					showConfirmButton: false,
					timer: 1500,
				});
				///////
				// 1) Remove token localStorage
				localStorage.removeItem("token");
				localStorage.removeItem("login");
				localStorage.removeItem("user_id");
				localStorage.removeItem("link_url");

				// 2) Set profile Store --> null
				dispatch({
					type: "auth/LOGOUT_PROFILE",
					payload: null,
				});

				// 3) Call api đăng xuất
				dispatch(logoutProfileAction);

				// 4) Gọi socket --> "logout"
				props.socket.emit("userLogout", props.socket.id);

				// 4) Go home
				setTimeout(goToHome, 2000);
			}
		});
	};
	// button User
	const [openUser, setOpenUser] = useState(false);
	const hideUser = () => {
		setOpenUser(false);
	};
	const handleOpenChangeUser = (newOpen) => {
		setOpenUser(newOpen);
	};

	// render content cho button User
	const renderContentUser = () => {
		return (
			<div className="content-button-nav-right">
				<div className="item-option">
					<SettingOutlined style={{ fontSize: 16, fontWeight: 500 }} />
					<div className="text">Cài đặt</div>
				</div>
				<div className="item-option">
					<InfoCircleOutlined style={{ fontSize: 16, fontWeight: 500 }} />
					<div className="text">Trợ giúp & hỗ trợ</div>
				</div>
				<div className="item-option" onClick={logout}>
					<LogoutOutlined style={{ fontSize: 16, fontWeight: 500 }} />
					<div className="text">Đăng xuất</div>
				</div>
			</div>
		);
	};

	///////////////

	// render user info
	const renderUserInfo = () => {
		if (profile) {
			return (
				<>
					<div className="navbar-left">
						<div onClick={goToHome} className="logo-area">
							<img
								src={`${process.env.PUBLIC_URL}/image/logo-space.png`}
								alt="logo"
							/>

							<span>Space</span>
						</div>

						<div className="search-bar">
							<Input
								placeholder="Tìm kiếm bạn bè"
								prefix={
									<SearchOutlined className="site-form-item-icon" />
								}
								style={{
									width: 320,
									height: 40,
									background: "rgba(255, 255, 255, 0.1)",
									borderRadius: 30,
									border: "none",
									color: "white",
								}}
							/>
						</div>
					</div>

					<nav className="navbar-center">
						<div className="home-box">
							<NavLink to="/" activeClassName="active" exact>
								<i className="fa-solid fa-house fa-md"></i>
							</NavLink>
						</div>
						<Space>
							<Badge
								size="medium"
								count={5}
								offset={[0, 2]}
								style={{ backgroundColor: "#52c41a", boxShadow: "none" }}
							>
								<NavLink to="/image-home" activeClassName="active">
									<i className="fa-regular fa-image fa-lg"></i>
								</NavLink>
							</Badge>
						</Space>

						<Space>
							<Badge
								size="medium"
								count={5}
								offset={[0, 2]}
								style={{ boxShadow: "none" }}
							>
								<NavLink to="/message" activeClassName="active">
									<i className="fa-solid fa-message fa-lg"></i>
								</NavLink>
							</Badge>
						</Space>

						<Space>
							<Badge
								count={5}
								offset={[0, 2]}
								style={{
									backgroundColor: "#1FD2D6",
									boxShadow: "none",
								}}
							>
								<NavLink to="/none-1" activeClassName="active">
									<i className="fa-brands fa-youtube fa-xl"></i>
								</NavLink>
							</Badge>
						</Space>
					</nav>

					<nav className="navbar-right">
						{/* <NavLink to="/sign-in">Hi, {profile.full_name}</NavLink>
						 */}
						<div className="notification">
							<AddFriendNotification />
							<AllEventNotification socket={socket} />
						</div>

						<div className="user-box">
							<Popover
								content={renderContentUser}
								title={profile.full_name}
								trigger="click"
								open={openUser}
								onOpenChange={handleOpenChangeUser}
								placement="bottomLeft"
							>
								<Avatar
									alt={profile.full_name.toUpperCase()}
									src={`http://localhost:8080/${profile.avatar}`}
									style={{
										border: "2px solid #555555",
										cursor: "pointer",
									}}
								/>
							</Popover>
						</div>
					</nav>
				</>
			);
		}
		return <></>;
	};

	return (
		<div id="Header">
			<>{renderUserInfo()}</>

			{console.log(notifications)}

			{/* <>{console.log(notifications)}</>
			<>{JSON.stringify(notifications)}</> */}
		</div>
	);
}

export default Header;
