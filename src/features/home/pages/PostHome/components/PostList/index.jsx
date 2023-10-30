import React from "react";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import { Spin } from "antd";

function PostList() {
	const arrPost = useSelector((state) => state.postStore.post);

	if (!arrPost)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	return (
		<div id={styles.PostList}>
			{arrPost.map((item) => {
				return <div>{item.post_id}</div>;
			})}
		</div>
	);
}

export default PostList;
