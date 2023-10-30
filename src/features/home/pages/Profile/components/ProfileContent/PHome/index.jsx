import React, { useEffect } from "react";
import "./PHome.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMyPostAction } from "features/home/action";
import { Spin } from "antd";

import ShowAbout from "./components/ShowAbout";
import ShowAlbum from "./components/ShowAlbum";
import SinglePost from "./components/SinglePost";
import CreatePost from "./components/CreatePost";

function PHome(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	const allMyPostRedux = useSelector((state) => state.postStore.myPost);

	// Đảo ngược myPost để lấy bài viết mới nhất lên đầu
	const allMyPost = allMyPostRedux.slice().reverse();

	////////////

	// Lấy bài viết cá nhân
	const fetchAllMyPost = async () => {
		dispatch(fetchAllMyPostAction);
	};

	useEffect(() => {
		fetchAllMyPost();
	}, []);

	if (!allMyPost)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	// Render my post
	const renderMyPost = (myPost) => {
		if (myPost.length === 0) {
			return <div className="not-content">Bạn không có bài viết nào</div>;
		} else {
			return myPost.map((post, index) => {
				return <SinglePost post={post} profile={profile} key={index} />;
			});
		}
	};

	return (
		<div id="PHome">
			{/* {console.log(arrMyPost)} */}
			<div className="post-container">
				<CreatePost profile={profile} />
				{renderMyPost(allMyPost)}
			</div>
			<div className="col-info">
				<ShowAbout profile={profile} />
				<ShowAlbum />
			</div>
		</div>
	);
}

export default PHome;
