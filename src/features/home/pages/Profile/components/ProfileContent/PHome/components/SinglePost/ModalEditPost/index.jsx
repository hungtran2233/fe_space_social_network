import React from "react";
import "./ModalEditPost.scss";
import { Avatar } from "@mui/material";
import moment from "moment-timezone";

function ModalEditPost(props) {
	const post = props.post;

	// Render images (cho myPost)
	const renderPostImages = (arrImg) => {
		// arrImg = post.post_image từ redux
		if (arrImg.length === 0) return <></>;
		// Tạo lớp CSS cho .img-container dựa trên số lượng ảnh
		const containerClass = (() => {
			if (arrImg.length === 1) return "single-img";
			if (arrImg.length === 2) return "double-img";
			if (arrImg.length === 3) return "triple-img";
			if (arrImg.length >= 4) return "quad-img";
		})();

		return (
			<div className={`img-container ${containerClass}`}>
				{arrImg.map((item, index) => (
					<div className="img-item" key={index}>
						<img
							src={`http://localhost:8080/public/img/${item.image.path}`}
							alt=""
						/>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="modal-edit-post">
			<div className="header">
				<div className="avatar">
					<Avatar
						alt={post.full_name}
						src={`http://localhost:8080/${post.user.avatar}`}
						sx={{ width: 40, height: 40 }}
					/>
				</div>
				<div className="post-info">
					<div className="full-name">{post.user.full_name}</div>
					<div className="more-info">
						<span className="time">
							{moment(post.created_at)
								.tz("Asia/Ho_Chi_Minh")
								.format("YYYY-MM-DD [lúc] HH:mm")}
						</span>
					</div>
				</div>
			</div>
			<div className="center">
				<div className="p-text">{post.content}</div>
				<div className="p-image-container">
					{renderPostImages(post.post_image)}
				</div>
			</div>
		</div>
	);
}

export default ModalEditPost;
