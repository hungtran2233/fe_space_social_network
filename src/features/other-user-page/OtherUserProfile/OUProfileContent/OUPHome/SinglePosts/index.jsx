import React, { useEffect, useRef, useState } from "react";
import "./SinglePosts.scss";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "features/home/action";
import {
	Button,
	Input,
	Modal,
	Popconfirm,
	Popover,
	Radio,
	Space,
	Spin,
	Tooltip,
	message,
} from "antd";

import { Avatar } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";
import MoreIcon from "@mui/icons-material/More";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import moment from "moment-timezone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
	CloseSquareOutlined,
	CopyOutlined,
	DeleteOutlined,
	EditOutlined,
	InfoCircleOutlined,
	PictureOutlined,
	SendOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import {
	fetchAllCommentPostsAction,
	otherUserCreateCommentAction,
	otherUserLikePostAction,
} from "features/other-user-page/otherUserAction";

function SinglePosts(props) {
	const dispatch = useDispatch();
	// Lấy toàn bộ thông tin của đối phương
	const otherUserInfo = props.otherUserInfo;
	// Lấy 1 bài post từ component cha sau khi map qua
	const posts = props.posts;
	// Lấy thông tin của chính mình để tương tác (comment, like)
	const myInfo = useSelector((state) => state.auth.profile);

	// Lấy tất cả comment của posts
	const [allComment, setAllComment] = useState([]);

	// Lấy toàn bộ comment của posts này
	const fetchAllCommentPosts = async () => {
		const dataCommentFromDB = await dispatch(
			fetchAllCommentPostsAction(posts.post_id)
		);
		setAllComment(dataCommentFromDB.comment);
	};

	useEffect(() => {
		fetchAllCommentPosts();
	}, []);

	//////
	// COMMENT --------
	const [inputValue, setInputValue] = useState("");
	const isInputEmpty = inputValue.trim() === "";
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};
	const handleSubmit = async (postId) => {
		// console.log(inputValue, "----", postId);
		// Tạo comment
		await dispatch(otherUserCreateCommentAction(postId, inputValue));
		// fetch lại giao diện comment
		fetchAllCommentPosts();
		// xóa nội dung input sau khi enter/submit
		setInputValue("");
	};

	// Nhấn button comment ==> cuộn xuống thẻ input
	const inputRefs = useRef([]);
	const handleFocusInput = () => {
		inputRefs.current.focus();
		// Trang cuộn xuống thẻ input
		// inputRefs.current.scrollIntoView({ behavior: "smooth" });
	};

	if (!myInfo)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	// Render privacy
	const renderPrivacy = (privacyId) => {
		if (privacyId === 1) {
			return (
				<>
					<span className="public">
						<PublicIcon sx={{ fontSize: 20, color: "gray" }} />
					</span>
				</>
			);
		} else if (privacyId === 2) {
			return (
				<>
					<span className="friend">
						<PeopleAltIcon sx={{ fontSize: 20, color: "gray" }} />
					</span>
				</>
			);
		} else if (privacyId === 3) {
			return (
				<>
					<span className="private">
						<LockIcon sx={{ fontSize: 20, color: "gray" }} />
					</span>
				</>
			);
		}
	};

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
						<img src={`http://localhost:8080/${item.image.path}`} alt="" />
					</div>
				))}
			</div>
		);
	};

	// Like post
	const handleLikePost = (postId) => {
		dispatch(otherUserLikePostAction(postId));
	};

	// render button like của một bài post ==> kiểm tra xem ta có like bài post đó hay chưa
	const renderButtonLike = () => {
		const myId = myInfo.user_id;
		const temp = posts.post_like.find((item) => item.user_id === myId);
		if (temp) {
			return true;
		}
		return false;
	};

	// render tất cả comment của post
	const renderAllCommentPost = (arrComment) => {
		return arrComment.map((comment, index) => {
			return (
				<div key={index} className="comment-item">
					<div className="top-item">
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
							{/* <div className="time">
							
						</div> */}
						</div>
					</div>

					<div className="add-action">
						<div className="btn-like-comment">Thích</div>
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

	return (
		<div className="single-posts">
			{/* {JSON.stringify(allComment)} */}
			<div className="header">
				<div className="avatar">
					<Avatar
						alt={otherUserInfo.full_name}
						src={`http://localhost:8080/${otherUserInfo.avatar}`}
						sx={{ width: 40, height: 40 }}
					/>
				</div>
				<div className="post-info">
					<div className="full-name">{otherUserInfo.full_name}</div>
					<div className="more-info">
						<span className="time">
							{moment(posts.created_at)
								.tz("Asia/Ho_Chi_Minh")
								.format("YYYY-MM-DD [lúc] HH:mm")}
						</span>
						<span className="privacy-icon">
							{renderPrivacy(posts.privacy.privacy_id)}
						</span>
					</div>
				</div>
			</div>
			<div className="center">
				<div className="p-text">{posts.content}</div>
				<div className="p-image-container">
					{renderPostImages(posts.post_image)}
				</div>
			</div>
			<div className="footer">
				<div className="statistics-bar">
					<div className="left-bar">
						<span className="like-icon">
							<ThumbUpIcon sx={{ fontSize: 15, color: "white" }} />
						</span>
						<span className="like-text">{posts.post_like.length} thích</span>
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
							{allComment.length} bình luận
						</span>
					</div>
				</div>
				<div className="action-bar">
					<div
						className={`btn-like ${renderButtonLike() ? "liked-status" : ""}`}
						onClick={() => handleLikePost(posts.post_id)}
					>
						<span className="like-icon">
							<ThumbUpOffAltIcon sx={{ fontSize: 20, color: "gray" }} />
						</span>
						<span>Thích</span>
					</div>
					<div className="btn-comment" onClick={handleFocusInput}>
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
				<div className="all-comment">{renderAllCommentPost(allComment)}</div>
				<div className="comment-bar">
					<div className="my-avatar-comment">
						<Avatar
							alt="Remy Sharp"
							src={`http://localhost:8080/${myInfo.avatar}`}
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
								onChange={handleInputChange}
								value={inputValue}
								ref={inputRefs}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										e.preventDefault(); // Ngăn ngừa việc thêm dòng mới trong textarea
										handleSubmit(posts.post_id);
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

							<Button
								type="primary"
								onClick={() => handleSubmit(posts.post_id)}
								htmlType="submit"
								disabled={isInputEmpty}
							>
								<SendOutlined />
							</Button>
						</Space.Compact>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SinglePosts;
