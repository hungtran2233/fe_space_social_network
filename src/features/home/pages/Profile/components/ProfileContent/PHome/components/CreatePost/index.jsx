import React, { useState } from "react";
import "./CreatePost.scss";
import { Avatar } from "@mui/material";
import { Button, Input, Modal, message } from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import LockIcon from "@mui/icons-material/Lock";

import { Select, Space } from "antd";
import UploadFilePost from "./UploadFilePost";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createPostAction, fetchAllMyPostAction } from "features/home/action";

const { TextArea } = Input;

function CreatePost(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	///////////
	const [valueContent, setValueContent] = useState("");
	const [valuePrivacy, setValuePrivacy] = useState(1);
	const [valueVideoUrl, setValueVideoUrl] = useState("");

	// file ảnh
	const [selectedFiles, setSelectedFiles] = useState([]);
	// Hàm này sẽ nhận danh sách các file từ component con
	const handleFileUpload = (files) => {
		setSelectedFiles(files);
	};

	// Ẩn hiện upload component
	const [isUploadVisible, setIsUploadVisible] = useState(false);
	const toggleUploadVisibility = () => {
		// Tắt component thì set lại file = 0
		setSelectedFiles([]);
		// Đóng component
		setIsUploadVisible(!isUploadVisible);
	};

	// Privacy
	const handleChangeSelectPrivacy = (value) => {
		setValuePrivacy(value);
	};

	const createPost = async () => {
		await dispatch(
			createPostAction(valueContent, valuePrivacy, selectedFiles, valueVideoUrl)
		);

		// set lại value về rỗng
		setValueContent("");
		setValuePrivacy(1);
		setValueVideoUrl("");
		setSelectedFiles([]);
		// đóng component upload
		setIsUploadVisible(!isUploadVisible);

		// fetch lại dữ liệu
		await dispatch(fetchAllMyPostAction);
	};

	// Message thông báo khi chưa chọn nội dung post
	const [messageApi, contextHolder] = message.useMessage();
	const errorPost = () => {
		messageApi.open({
			type: "error",
			content: "Bạn chưa chọn nội dung nào để đăng cả",
		});
	};

	// Modal xác nhận
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		if (valueContent !== "" || valueVideoUrl !== "" || selectedFiles.length > 0) {
			setIsModalOpen(true);
		} else {
			errorPost();
		}
	};
	const handleOk = () => {
		// Đăng bài
		createPost();
		// Đóng modal
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div id="CreatePost">
			<div className="title-theme-public">
				<div className="left"></div>
				<div className="text">Tạo bài viết</div>
			</div>
			<div className="header">
				<div className="avatar">
					<Avatar
						alt="Remy Sharp"
						src={`http://localhost:8080/${profile.avatar}`}
						sx={{ width: 40, height: 40 }}
					/>
				</div>
				<div className="input-bar">
					<TextArea
						value={valueContent}
						onChange={(e) => setValueContent(e.target.value)}
						placeholder="Hãy chia sẻ những cảm nghĩ của bạn"
						autoSize={{
							minRows: 1,
							maxRows: 5,
						}}
						// bordered={false}
					/>
				</div>
			</div>

			{/* Thêm ảnh  */}
			{isUploadVisible && (
				<div className="media-content">
					<div className="close-icon">
						<CloseCircleOutlined
							onClick={toggleUploadVisibility}
							style={{
								fontSize: 24,
								fontWeight: 100,
								color: "gray",
								cursor: "pointer",
							}}
						/>
					</div>
					<UploadFilePost onFileUpload={handleFileUpload} />
				</div>
			)}

			<div className="action">
				<div className="left-action">
					<span className="location-icon">
						<LocationOnIcon />
					</span>
					<span>
						<QueueMusicIcon />
					</span>
					<span className="image-icon" onClick={toggleUploadVisibility}>
						<ImageIcon />
					</span>
					<span>
						<VideocamIcon />
					</span>
					<span>
						<CameraAltIcon />
					</span>
				</div>
				<div className="right-action">
					<Space wrap>
						<Select
							defaultValue={valuePrivacy}
							style={{
								width: 120,
							}}
							onChange={handleChangeSelectPrivacy}
							options={[
								{
									value: 1,
									label: (
										<div className="privacy-option">
											<PublicIcon sx={{ fontSize: 16 }} />
											<span>Công khai</span>
										</div>
									),
								},
								{
									value: 2,
									label: (
										<div className="privacy-option">
											<GroupIcon sx={{ fontSize: 16 }} />
											<span>Bạn bè</span>
										</div>
									),
								},
								{
									value: 3,
									label: (
										<div className="privacy-option">
											<LockIcon sx={{ fontSize: 16 }} />
											<span>Riêng tư</span>
										</div>
									),
								},
							]}
						/>
					</Space>
				</div>
			</div>
			<div className="btn-post" onClick={showModal}>
				Đăng bài
			</div>

			<Modal
				title="Xác nhận"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				Bạn có muốn đăng bài viết này không ?
			</Modal>

			<div>{contextHolder}</div>
		</div>
	);
}

export default CreatePost;
