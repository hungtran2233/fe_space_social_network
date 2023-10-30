import React from "react";
import { Switch, Route, NavLink, useRouteMatch } from "react-router-dom";
import "./OUProfileContent.scss";
import OUPHeader from "./OUPHeader";
import OUPHome from "./OUPHome";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import OUPAbout from "./OUPAbout";

function OUProfileContent(props) {
	// Lấy danh sách posts
	const arrOtherUserPosts = useSelector((state) => state.otherUserStore.otherUserPosts);

	/////
	const match = useRouteMatch();
	const linkUrl = match.params.link;

	if (!arrOtherUserPosts)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return (
		<>
			<OUPHeader otherUserInfo={props.otherUserInfo} />

			<div id="OUProfileContent">
				<div className="profile-menu">
					<div className="left-menu">
						<NavLink
							to={"/other-user/" + linkUrl}
							activeClassName="active"
							exact
						>
							Dòng thời gian
						</NavLink>

						<NavLink
							to={"/other-user/" + linkUrl + "/about"}
							activeClassName="active"
						>
							Giới thiệu
						</NavLink>

						<NavLink
							to={"/other-user/" + linkUrl + "/friend"}
							activeClassName="active"
						>
							Bạn bè
						</NavLink>
					</div>

					<div className="right-menu">
						<div className="interaction">
							<div className="post-count">
								<div className="title">Bài đăng</div>
								<div className="count">{arrOtherUserPosts.length}</div>
							</div>
							<div className="page-count">
								<div className="title">Trang theo dõi</div>
								<div className="count">0</div>
							</div>
							<div className="follow-count">
								<div className="title">Lượt theo dõi</div>
								<div className="count">0</div>
							</div>
						</div>
					</div>
				</div>

				<div className="content">
					<Switch>
						<Route path={"/other-user/" + linkUrl} exact>
							<OUPHome
								otherUserInfo={props.otherUserInfo}
								arrOtherUserPosts={arrOtherUserPosts}
							/>
						</Route>
						<Route path={"/other-user/" + linkUrl + "/about"}>
							<OUPAbout otherUserInfo={props.otherUserInfo} />
						</Route>
						<Route path={"/other-user/" + linkUrl + "/friend"}>c</Route>
					</Switch>
				</div>
			</div>
		</>
	);
}

export default OUProfileContent;
