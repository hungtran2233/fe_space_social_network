import React, { useEffect } from "react";
import { Col, Row, Spin } from "antd";

import { useDispatch, useSelector } from "react-redux";

import "./PostContainer.scss";
import { fetchAllPostAction, fetchPostAction } from "features/home/action";
import CreatePost from "../Profile/components/ProfileContent/PHome/components/CreatePost";
import SinglePost from "../Profile/components/ProfileContent/PHome/components/SinglePost";
import UserPosts from "./components/UserPost";

function PostContainer(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	const allPost = useSelector((state) => state.postStore.allPost);

	////////////

	// Lấy tất cả posts
	const fetchAllPost = async () => {
		dispatch(fetchAllPostAction);
	};

	useEffect(() => {
		fetchAllPost();
	}, []);

	if (!allPost)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	// Render my post
	const renderAllPost = (allPost) => {
		if (allPost.length === 0) {
			return <div className="not-content">Bạn không có bài viết nào</div>;
		} else {
			return allPost.map((post, index) => {
				return <UserPosts post={post} profile={profile} key={index} />;
			});
		}
	};
	return (
		<div id="PostContainer">
			<div className="create-post-area">
				<CreatePost profile={profile} />
				{renderAllPost(allPost)}
			</div>
		</div>
	);
}

export default PostContainer;
