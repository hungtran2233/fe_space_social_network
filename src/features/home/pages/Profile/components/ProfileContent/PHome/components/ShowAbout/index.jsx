import React from "react";
import "./ShowAbout.scss";
import SchoolIcon from "@mui/icons-material/School";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function ShowAbout(props) {
	const profile = props.profile;
	const { country, working_at, study_at, favorites } = profile.user_info;

	const renderNotInfo = () => {
		if (!country && !working_at && !study_at && !favorites) {
			return <div>Chưa có thông tin cá nhân nào</div>;
		}
	};

	return (
		<div id="ShowAbout">
			{/* {JSON.stringify(profile)} */}
			<div className="title">Giới thiệu</div>
			{renderNotInfo()}
			{/* Nơi sống  */}
			{country == null ? (
				<div></div>
			) : (
				<div className="child-item">
					<span>
						<FmdGoodIcon sx={{ fontSize: 28, color: "#A4A4A4" }} />
					</span>
					<span> Đến từ {country}</span>
				</div>
			)}

			{/* Nơi làm việc */}
			{working_at == null ? (
				<div></div>
			) : (
				<div className="child-item">
					<span>
						<HomeWorkIcon sx={{ fontSize: 28, color: "#A4A4A4" }} />
					</span>
					<span>Đang làm việc tại {working_at}</span>
				</div>
			)}
			{/* Nơi học tập  */}
			{study_at == null ? (
				<div></div>
			) : (
				<div className="child-item">
					<span>
						<SchoolIcon sx={{ fontSize: 28, color: "#A4A4A4" }} />
					</span>
					<span>Đã học tại {study_at}</span>
				</div>
			)}

			{/* Sở thích  */}

			{favorites == null ? (
				<div></div>
			) : (
				<div className="child-item">
					<span>
						<AutoAwesomeIcon sx={{ fontSize: 28, color: "#A4A4A4" }} />
					</span>
					<span>Sở thích: {favorites}</span>
				</div>
			)}
		</div>
	);
}

export default ShowAbout;
