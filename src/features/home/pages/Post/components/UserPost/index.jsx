import { Avatar } from "@mui/material";
import moment from "moment-timezone";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, Input, Space, Tooltip } from "antd";
import { PictureOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { fetchLikePostAction } from "features/home/action";

function UserPost(props) {
	const dispatch = useDispatch();
	const profile = props.profile;
	const post = props.post;

	// Render images (cho other post)
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
						<img src={`http://localhost:8080/${item.image.path}`} alt="" />
					</div>
				))}
			</div>
		);
	};

	// render tất cả comment của post
	const renderAllCommentPost = (arrComment) => {
		return arrComment.map((comment, index) => {
			return (
				<div key={index} className="comment-item">
					<div className="user-avatar">
						<Avatar
							alt="Remy Sharp"
							src={`http://localhost:8080/${comment.user.avatar}`}
							sx={{ width: 34, height: 34 }}
						/>
					</div>
					<div className="content">
						<div className="user-full-name">{comment.user.full_name}</div>
						<div className="text">{comment.content}</div>
						<div className="time">
							{moment(comment.created_at)
								.tz("Asia/Ho_Chi_Minh")
								.format("YYYY-MM-DD [lúc] HH:mm")}
						</div>
					</div>
				</div>
			);
		});
	};

	// Fetch like post
	const fetchLikePost = (postId) => {
		dispatch(fetchLikePostAction(postId));
	};

	// Like post
	const handleLikePost = (postId) => {
		// console.log(postId);
		fetchLikePost(postId);
	};

	return (
		<div id={post.post_id} className="content-item" key={post.post_id}>
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
						<span className="privacy-icon"></span>
					</div>
				</div>
				<div className="btn-custom">{/*  */}</div>
			</div>
			<div className="center">
				<div className="p-text">{post.content}</div>
				<div className="p-image-container">
					{renderPostImages(post.post_image)}
				</div>
			</div>
			<div className="footer">
				<div className="statistics-bar">
					<div className="left-bar">
						<span className="like-icon">
							<ThumbUpIcon sx={{ fontSize: 15, color: "white" }} />
						</span>
						<span className="like-text">{post.post_like.length} thích</span>
					</div>

					<div className="right-bar">
						<span className="comment-icon">
							<ChatBubbleOutlineIcon
								sx={{
									fontSize: 16,
									color: "gray",
									fontWeight: 600,
								}}
							/>
						</span>
						<span className="comment-text">
							{post.comment.length} bình luận
						</span>
					</div>
				</div>
				<div className="action-bar">
					<div
						className={`btn-like ${"" ? "liked-status" : ""}`}
						onClick={() => handleLikePost(post.post_id)}
					>
						<span className="like-icon">
							<ThumbUpOffAltIcon sx={{ fontSize: 20, color: "gray" }} />
						</span>
						<span>Thích</span>
					</div>
					<div className="btn-comment">
						<span className="comment-icon">
							<ChatBubbleOutlineIcon sx={{ fontSize: 20, color: "gray" }} />
						</span>
						<span>Bình luận</span>
					</div>
					<div className="btn-share">
						<span className="share-icon">
							<ContentCopyIcon sx={{ fontSize: 20, color: "gray" }} />
						</span>
						<span>Sao chép liên kết</span>
					</div>
				</div>
				<div className="all-comment">{renderAllCommentPost(post.comment)}</div>
				<div className="comment-bar">
					<div className="my-avatar-comment">
						<Avatar
							alt="Remy Sharp"
							src={`http://localhost:8080/${profile.avatar}`}
							sx={{ width: 34, height: 34 }}
						/>
					</div>
					<div className="text-bar">
						<Space.Compact
							style={{
								width: "100%",
							}}
						>
							<Input
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										e.preventDefault(); // Ngăn ngừa việc thêm dòng mới trong textarea
									}
								}}
								placeholder="Nhập bình luận của bạn"
								suffix={
									<>
										<Tooltip title="Chèn icon cảm xúc">
											<SmileOutlined
												style={{
													color: "rgba(0,0,0,.45)",
													fontSize: 16,
												}}
											/>
										</Tooltip>
										<Tooltip title="Đính kèm ảnh của bạn">
											<PictureOutlined
												style={{
													color: "rgba(0,0,0,.45)",
													fontSize: 18,
												}}
											/>
										</Tooltip>
									</>
								}
							/>

							<Button type="primary" htmlType="submit">
								<SendOutlined />
							</Button>
						</Space.Compact>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserPost;
