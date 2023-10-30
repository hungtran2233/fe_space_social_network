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
	// button Avatar
	const [open, setOpen] = useState(false);
	const hide = () => {
		setOpen(false);
	};
	const handleOpenChange = (newOpen) => {
		setOpen(newOpen);
	};

	// render content cho button Avatar
	const renderContentForButton = () => {
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
								placeholder="Tìm kiếm"
								prefix={
									<SearchOutlined className="site-form-item-icon" />
								}
								style={{
									width: 220,
									background: "#495A6E",
									borderRadius: 30,
									border: "none",
									color: "white",
								}}
							/>
						</div>
					</div>
					<nav className="navbar-center">
						<NavLink to="/" activeClassName="active" exact>
							<HomeIcon sx={{ fontSize: 30 }} />
							{/* <HomeOutlined style={{ background: "white" }} /> */}
						</NavLink>
						<NavLink to="/image-home" activeClassName="active">
							<PhotoIcon sx={{ fontSize: 30 }} />
						</NavLink>

						<Space>
							<Badge count={5} offset={[-14, 2]}>
								<NavLink to="/message" activeClassName="active">
									<MessageIcon sx={{ fontSize: 30 }} />
								</NavLink>
							</Badge>
						</Space>
						{/* <NavLink to="/friend" activeClassName="active">
							<PersonIcon sx={{ fontSize: 30 }} />
						</NavLink> */}
						{/* <NavLink to="/notification" activeClassName="active">
							<PublicIcon sx={{ fontSize: 30 }} />
						</NavLink> */}
					</nav>

					<nav className="navbar-right">
						{/* <NavLink to="/sign-in">Hi, {profile.full_name}</NavLink>
						 */}
						<div className="notification">
							<Space>
								<Badge
									count={5}
									offset={[-18, 2]}
									style={{ backgroundColor: "#1FD2D6" }}
								>
									<div className="n-friend">
										<PersonIcon sx={{ fontSize: 26 }} />
									</div>
								</Badge>
							</Space>
							<Space>
								<Badge
									count={5}
									offset={[-18, 2]}
									style={{ backgroundColor: "#764FFA" }}
								>
									<div className="n-action">
										<NotificationsIcon sx={{ fontSize: 26 }} />
									</div>
								</Badge>
							</Space>
						</div>

						<Popover
							content={renderContentForButton}
							title={profile.full_name}
							trigger="click"
							open={open}
							onOpenChange={handleOpenChange}
							placement="bottomLeft"
						>
							<Avatar
								alt="Remy Sharp"
								src={`http://localhost:8080/${profile.avatar}`}
								style={{ border: "2px solid #555555", cursor: "pointer" }}
							/>
						</Popover>
					</nav>
				</>
			);
		}
		return <></>;
	};

	return <div id="Header">{renderUserInfo()}</div>;
}

export default Header;
