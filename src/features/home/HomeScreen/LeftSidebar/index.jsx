import React from "react";
import "./LeftSidebar.scss";
import {
	BrowserRouter as Router,
	NavLink,
	useHistory,
	Switch,
	Route,
} from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ImageIcon from "@mui/icons-material/Image";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FeedIcon from "@mui/icons-material/Feed";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import BallotIcon from "@mui/icons-material/Ballot";
import Profile from "features/home/pages/Profile";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Avatar } from "@mui/material";

function LeftSidebar(props) {
	const profile = props.profile;
	// const linkUrl = localStorage.getItem("link_url");
	const history = useHistory();
	const goToProfile = () => {
		history.push("/profile/" + profile.link_url);
	};

	// Đến trang friend
	const goToFriendPage = () => {
		history.push("/friend-page/");
	};

	// Đến trang news
	const goToNewsPage = () => {
		history.push("/news");
	};

	return (
		<div id="LeftSidebar">
			<div className="btn-sider" onClick={goToProfile}>
				<div className="avatar">
					<Avatar
						alt={profile.full_name.toUpperCase()}
						src={`http://localhost:8080/${profile.avatar}`}
						style={{
							cursor: "pointer",
							border: "1px solid #BDBDBD",
						}}
					/>
				</div>
				<div className="text">{profile.full_name}</div>
			</div>

			<div className="btn-sider" onClick={goToFriendPage}>
				<div className="icon">
					<PeopleAltIcon fontSize="medium" color="primary" />
				</div>
				<div className="text">Bạn bè</div>
			</div>

			<div className="btn-sider">
				<div className="icon">
					<GroupsIcon sx={{ fontSize: 28, color: "green" }} />
				</div>
				<div className="text">Nhóm</div>
			</div>

			<div className="btn-sider" onClick={goToNewsPage}>
				<div className="icon">
					<AutoStoriesIcon sx={{ fontSize: 26, color: "orange" }} />
				</div>
				<div className="text">Tin của bạn</div>
			</div>

			<div className="btn-sider">
				<div className="icon">
					<OndemandVideoIcon fontSize="medium" sx={{ color: "red" }} />
				</div>
				<div className="text">Video</div>
			</div>

			<div className="btn-sider">
				<div className="icon">
					<ImageIcon sx={{ fontSize: 28, color: "#66FF99" }} />
				</div>
				<div className="text">Ảnh mới</div>
			</div>

			<div className="btn-sider">
				<div className="icon">
					<HistoryIcon sx={{ fontSize: 28, color: "#3366FF" }} />
				</div>
				<div className="text">Kỷ niệm</div>
			</div>

			<div className="btn-sider">
				<div className="icon">
					<BookmarkIcon sx={{ fontSize: 28, color: "#CC00FF" }} />
				</div>
				<div className="text">Trang đã lưu</div>
			</div>

			{/* <div className="btn-sider">
				<div className="icon">
					<FeedIcon sx={{ fontSize: 28, color: "#3399FF" }} />
				</div>
				<div className="text">Tin tức thường nhật</div>
			</div> */}

			<div className="btn-sider">
				<div className="icon">
					<AccessibilityNewIcon sx={{ fontSize: 28, color: "#FF6666" }} />
				</div>
				<div className="text">Người nổi tiếng</div>
			</div>

			<div className="btn-sider">
				<div className="icon">
					<FollowTheSignsIcon sx={{ fontSize: 28, color: "#00CCCC" }} />
				</div>
				<div className="text">Đang theo dõi</div>
			</div>

			<div className="btn-sider">
				<div className="icon">
					<BallotIcon sx={{ fontSize: 28, color: "#9999FF" }} />
				</div>
				<div className="text">Quảng cáo</div>
			</div>
		</div>
	);
}

export default LeftSidebar;
