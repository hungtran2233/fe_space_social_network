import React, { useEffect } from "react";
import "./OUPHome.scss";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import OUPSinglePost from "features/other-user-page/OtherUserProfile/OUProfileContent/OUPHome/SinglePosts";
import SinglePosts from "features/other-user-page/OtherUserProfile/OUProfileContent/OUPHome/SinglePosts";
import ShowAbout from "features/home/pages/Profile/components/ProfileContent/PHome/components/ShowAbout";
import OUPAlbum from "../OUPAlbum";

function OUPHome(props) {
	// Thông tin của other user
	const otherUserInfo = props.otherUserInfo;
	// Đảo ngược posts để lấy bài viết mới nhất lên đầu
	const arrPosts = props.arrOtherUserPosts.slice().reverse();

	// Render other user posts
	const renderOtherUserPost = () => {
		if (arrPosts.length === 0) {
			return <div className="not-content">Không có bài viết nào để hiển thị</div>;
		} else {
			return arrPosts.map((posts, index) => {
				return (
					<SinglePosts
						otherUserInfo={props.otherUserInfo}
						posts={posts}
						key={index}
					/>
				);
				// return "0";
			});
		}
	};

	return (
		<div id="OUPHome">
			<div className="post-container">{renderOtherUserPost()}</div>
			<div className="col-info">
				<ShowAbout profile={otherUserInfo} />
				<OUPAlbum />
			</div>
		</div>
	);
}

export default OUPHome;
