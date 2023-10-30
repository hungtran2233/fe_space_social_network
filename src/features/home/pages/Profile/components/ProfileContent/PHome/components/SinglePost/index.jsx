import React, { useRef, useState } from "react";
import "./SinglePost.scss";
import { useDispatch } from "react-redux";
import {
	createCommentAction,
	fetchAllMyPostAction,
	deletePostAction,
	fetchLikePostAction,
} from "features/home/action";

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
import ModalEditPost from "./ModalEditPost";

function SinglePost(props) {
	const post = props.post;
	const profile = props.profile;
	const dispatch = useDispatch();
	// Lấy bài viết cá nhân
	const fetchAllMyPost = async () => {
		dispatch(fetchAllMyPostAction);
	};

	// like post
	const fetchLikePost = async (postId) => {
		await dispatch(fetchLikePostAction(postId));
		await fetchAllMyPost();
	};

	// comment cho post
	const [inputValue, setInputValue] = useState("");
	const isInputEmpty = inputValue.trim() === "";
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};
	const handleSubmit = async (postId) => {
		// console.log(inputValue);
		await createCommentAction(postId, inputValue);
		// render lại giao diện post
		await fetchAllMyPost();
		// xóa nội dung input sau khi enter/submit
		setInputValue("");
	};

	// Privacy -- hiển thị Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Privacy -- Nội dung trong modal
	const [radioValue, setRadioValue] = useState();
	const onChange = (e) => {
		// console.log("radio checked", e.target.value);
		setRadioValue(e.target.value);
	};

	// Render privacy (cho myPost)
	const renderPrivacy = (privacyId) => {
		if (privacyId === 1) {
			return (
				<>
					<span className="public" onClick={showModal}>
						<PublicIcon sx={{ fontSize: 20, color: "gray" }} />
					</span>
					<Modal
						title="Chọn đối tượng được xem bài này"
						open={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<Radio.Group onChange={onChange} value={privacyId}>
							<Space direction="vertical">
								<Radio value={1}>Công khai</Radio>

								<Radio value={2}>Bạn bè</Radio>

								<Radio value={3}>Riêng tư</Radio>
							</Space>
						</Radio.Group>
					</Modal>
				</>
			);
		} else if (privacyId === 2) {
			return (
				<>
					<span className="friend" onClick={showModal}>
						<PeopleAltIcon sx={{ fontSize: 20, color: "gray" }} />
					</span>
					<Modal
						title="Chọn đối tượng được xem bài này"
						open={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<Radio.Group onChange={onChange} value={privacyId}>
							<Space direction="vertical">
								<Radio value={1}>Công khai</Radio>

								<Radio value={2}>Bạn bè</Radio>

								<Radio value={3}>Riêng tư</Radio>
							</Space>
						</Radio.Group>
					</Modal>
				</>
			);
		} else if (privacyId === 3) {
			return (
				<>
					<span className="private" onClick={showModal}>
						<LockIcon sx={{ fontSize: 20, color: "gray" }} />
					</span>
					<Modal
						title="Chọn đối tượng được xem bài này"
						open={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<Radio.Group onChange={onChange} value={privacyId}>
							<Space direction="vertical">
								<Radio value={1}>Công khai</Radio>

								<Radio value={2}>Bạn bè</Radio>

								<Radio value={3}>Riêng tư</Radio>
							</Space>
						</Radio.Group>
					</Modal>
				</>
			);
		}
	};

	// Xóa bài post
	const handleDeletePost = async (postId) => {
		await deletePostAction(postId);
		fetchAllMyPost();
	};

	//  Xóa post -- Hộp thoại confirm
	const confirm = (postId) => {
		handleDeletePost(postId);
		message.success("Xóa bài viết thành công");
	};
	const cancel = (e) => {
		return;
	};

	// ---- Chỉnh sửa post ------
	// Đóng popover
	const [openPopoverBtnCustom, setOpenPopoverBtnCustom] = useState(false);
	const handleOpenChangePopover = (newOpen) => {
		setOpenPopoverBtnCustom(newOpen);
	};
	// Mở modal edit post
	const [isModalOpenEditPost, setIsModalOpenEditPost] = useState(false);
	const showModalEditPost = () => {
		// Đóng popover
		setOpenPopoverBtnCustom(false);
		// Mở modal
		setIsModalOpenEditPost(true);
		// Thực hiện
	};
	const handleOkEditPost = (post) => {
		// Chỉnh sửa post
		console.log(post);

		// Đóng modal
		setIsModalOpenEditPost(false);
	};
	const handleCancelEditPost = () => {
		setIsModalOpenEditPost(false);
	};

	const content = (postId) => {
		return (
			<div className="content-custom-post">
				{/* // Chỉnh sửa bài viết  */}
				<div className="option-item" onClick={showModalEditPost}>
					<EditOutlined style={{ fontSize: 20 }} />
					<span>Chỉnh sửa bài viết</span>
				</div>

				<div className="option-item">
					<CopyOutlined style={{ fontSize: 20 }} />
					<span>Sao chép liên kết</span>
				</div>
				<div className="option-item">
					<CloseSquareOutlined style={{ fontSize: 20 }} />
					<span>Ẩn bài viết lưu vào kho lưu trữ</span>
				</div>

				{/* Xóa post  */}
				<Popconfirm
					title="Xóa bài viết"
					description="Bạn có chắc là muốn xóa bài viết này ?"
					onConfirm={() => confirm(post.post_id)}
					onCancel={cancel}
					okText="Có"
					cancelText="Không"
					placement="bottom"
				>
					<div className="option-item">
						<DeleteOutlined style={{ fontSize: 20 }} />
						<span>Xóa bài viết</span>
					</div>
				</Popconfirm>
			</div>
		);
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
		// console.log(postId);
		fetchLikePost(postId);
	};

	// render button like của một bài post ==> kiểm tra xem ta có like bài post đó hay chưa
	const renderButtonLike = (arrPostLike) => {
		const myId = profile.user_id;
		const temp = arrPostLike.find((item) => item.user_id === myId);
		if (temp) {
			return true;
		}
		return false;
	};

	// Nhấn button comment ==> cuộn xuống thẻ input
	const inputRefs = useRef([]);
	const handleFocusInput = () => {
		inputRefs.current.focus();
		// Trang cuộn xuống thẻ input
		// inputRefs.current.scrollIntoView({ behavior: "smooth" });
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
						<span className="privacy-icon">
							{renderPrivacy(post.privacy_id)}
						</span>
					</div>
				</div>
				<div className="btn-custom">
					<Space wrap>
						<Popover
							content={content(post.post_id)}
							trigger="click"
							placement="bottomRight"
							open={openPopoverBtnCustom}
							onOpenChange={handleOpenChangePopover}
						>
							<MoreIcon sx={{ color: "#848484" }} />
						</Popover>
					</Space>

					<Modal
						title="Basic Modal"
						open={isModalOpenEditPost}
						onOk={() => handleOkEditPost(post)}
						onCancel={handleCancelEditPost}
						maskClosable={false}
					>
						{/* // Hiển thị lại bài post  */}
						<ModalEditPost post={post} />
					</Modal>
				</div>
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
						className={`btn-like ${
							renderButtonLike(post.post_like) ? "liked-status" : ""
						}`}
						onClick={() => handleLikePost(post.post_id)}
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
								onChange={handleInputChange}
								value={inputValue}
								ref={inputRefs}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										e.preventDefault(); // Ngăn ngừa việc thêm dòng mới trong textarea
										handleSubmit(post.post_id);
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
								onClick={() => handleSubmit(post.post_id)}
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

export default SinglePost;
