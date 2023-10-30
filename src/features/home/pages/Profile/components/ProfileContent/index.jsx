import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./ProfileContent.scss";
import PHome from "./PHome";
import PAbout from "./PAbout";
import PFriend from "./PFriend";
import PHeader from "./PHeader";
import { useSelector } from "react-redux";

function ProfileContent(props) {
	const arrMyPosts = useSelector((state) => state.postStore.myPost);

	const linkUrl = props.profile.link_url;

	return (
		<>
			<PHeader profile={props.profile} />

			<div id="ProfileContent">
				<div className="profile-menu">
					<div className="left-menu">
						<NavLink
							to={"/profile/" + linkUrl}
							activeClassName="active"
							exact
						>
							Dòng thời gian
						</NavLink>

						<NavLink
							to={"/profile/" + linkUrl + "/about"}
							activeClassName="active"
						>
							Giới thiệu
						</NavLink>

						<NavLink
							to={"/profile/" + linkUrl + "/friend"}
							activeClassName="active"
						>
							Bạn bè
						</NavLink>
					</div>

					<div className="right-menu">
						<div className="interaction">
							<div className="post-count">
								<div className="title">Bài đăng</div>
								<div className="count">{arrMyPosts.length}</div>
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
						<Route path={"/profile/" + linkUrl} exact>
							<PHome profile={props.profile} />
						</Route>
						<Route path={"/profile/" + linkUrl + "/about"}>
							<PAbout profile={props.profile} />
						</Route>
						<Route path={"/profile/" + linkUrl + "/friend"}>
							<PFriend />
						</Route>
					</Switch>
				</div>
			</div>
		</>
	);
}

export default ProfileContent;
