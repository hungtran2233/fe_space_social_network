import React, { useState } from "react";
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
import { fetchProfileAction, logoutProfileAction } from "features/authentication/action";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PhotoIcon from "@mui/icons-material/Photo";
import MessageIcon from "@mui/icons-material/Message";
import PublicIcon from "@mui/icons-material/Public";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Header() {
	const dispatch = useDispatch();
	const history = useHistory();
	const profile = useSelector((state) => state.auth.profile);
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

				// 2) Set profile Store --> null
				dispatch({
					type: "auth/LOGOUT_PROFILE",
					payload: null,
				});

				// 3) Call api đăng xuất
				dispatch(logoutProfileAction);

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

	// button Friend
	const [openFriend, setOpenFriend] = useState(false);
	const hideFriend = () => {
		setOpenFriend(false);
	};
	const handleOpenChangeFriend = (newOpen) => {
		setOpenFriend(newOpen);
	};

	// render content -- Friend
	const renderContentFriend = () => {
		return (
			<div className="content-button-friend">
				<div className="item-option">
					<div className="text">Loan đã gửi lời mời kết bạn</div>
				</div>
				<div className="item-option">
					<div className="text">Trung đã chấp nhận lời mời kết bạn</div>
				</div>
				<div className="item-option" onClick={logout}>
					<div className="text">Bình đã gửi lời mời kết bạn</div>
				</div>
			</div>
		);
	};

	///////////////
	// button notification
	const [openNotification, setOpenNotification] = useState(false);
	const hideNotification = () => {
		setOpenNotification(false);
	};
	const handleOpenChangeNotification = (newOpen) => {
		setOpenNotification(newOpen);
	};

	// render content cho button User
	const renderContentNotification = () => {
		return (
			<div className="content-button-notification">
				<div className="item-option">
					<div className="text">Duy đã thêm một ảnh mới</div>
				</div>
				<div className="item-option">
					<div className="text">
						Ánh đã trả lời một bình luận mà bạn được gắn thẻ
					</div>
				</div>
				<div className="item-option" onClick={logout}>
					<div className="text">Ngọc đã đăng bài viết mới</div>
				</div>
			</div>
		);
	};

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
							<Popover
								content={renderContentFriend}
								title="Bạn bè"
								trigger="click"
								open={openFriend}
								onOpenChange={handleOpenChangeFriend}
								placement="bottomLeft"
							>
								<div className="icon">
									<Space>
										<Badge
											count={5}
											offset={[10, -10]}
											style={{
												backgroundColor: "rgb(250, 173, 20)",
												boxShadow: "none",
											}}
										>
											<div className="n-friend">
												<i className="fa-solid fa-user fa-lg"></i>
											</div>
										</Badge>
									</Space>
								</div>
							</Popover>

							{/* Notification  */}
							<Popover
								content={renderContentNotification}
								title="Thông báo"
								trigger="click"
								open={openNotification}
								onOpenChange={handleOpenChangeNotification}
								placement="bottomLeft"
							>
								<div className="icon">
									<Space>
										<Badge
											count={5}
											offset={[10, -10]}
											style={{
												backgroundColor: "#764FFA",
												boxShadow: "none",
											}}
										>
											<div className="n-action">
												<i className="fa-solid fa-bell fa-lg"></i>
											</div>
										</Badge>
									</Space>
								</div>
							</Popover>
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
									alt="Remy Sharp"
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

	return <div id="Header">{renderUserInfo()}</div>;
}

export default Header;
