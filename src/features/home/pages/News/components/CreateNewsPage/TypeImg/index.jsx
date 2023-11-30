import { Button, Col, Input, Row, message } from "antd";
import React, { useState } from "react";
import "./TypeImg.scss";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import NewsPrivacy from "../NewsPrivacy";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewsAction, createNewsTypeImgAction } from "../../../services/newsAction";

function TypeImg({ onCancel }) {
	const dispatch = useDispatch();
	// lấy giá trị privacy
	const [privacyId, setPrivacyId] = useState("1");
	// ẩn hiện music box
	const [isMusicVisible, setMusicVisible] = useState(false);
	// Lấy giá trị music url
	const [musicUrl, setMusicUrl] = useState("");
	// Message thông báo thêm tin thành công
	const [messageApi, contextHolder] = message.useMessage();
	const key = "updatable";
	const openMessage = () => {
		messageApi.open({
			key,
			type: "loading",
			content: "Đang đăng tin...",
		});
		setTimeout(() => {
			messageApi.open({
				key,
				type: "success",
				content: "Thành công!",
				duration: 2,
			});
		}, 2000);
	};

	// Chuyển trang sau khi đăng tin thành công
	const history = useHistory();

	// Antd - upload img
	const [fileList, setFileList] = useState([]);
	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};
	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	const customRequest = ({ onSuccess }) => {
		// Bạn có thể thực hiện xử lý ở đây (hoặc để trống nếu không muốn thực hiện gì cả)
		// console.log("Chưa gửi yêu cầu lên máy chủ");
		onSuccess(); // Đánh dấu là đã thành công để tránh thông báo lỗi
	};

	// Lấy giá trị privacy
	const getPrivacyId = (value) => {
		setPrivacyId(value);
	};

	// Ẩn hiện music-url-box
	const handleShowMusicBox = () => {
		setMusicVisible(!isMusicVisible);
	};

	// Lấy giá trị music url
	const handleMusicUrl = (e) => {
		// console.log(e.target.value);
		setMusicUrl(e.target.value);
	};

	// Call api - tạo news
	const createNews = async () => {
		// console.log(fileList);
		// return;
		await dispatch(createNewsTypeImgAction(fileList, musicUrl, privacyId));
		// hiển thị message tiến trình đăng tin
		openMessage();

		// chuyển hướng trang
		setTimeout(() => {
			history.push("/");
		}, 3000);
	};

	return (
		<Row id="TypeImg">
			{/* {console.log(privacyId)} */}
			<Col span={8}>
				<div className="container-left">
					<div className="all-action-news">
						<div className="title">Tin của bạn</div>
						<div className="control-news">
							<NewsPrivacy getPrivacyId={getPrivacyId} />

							<div className="add-text">
								<i className="fa-solid fa-font fa-xl"></i>
								<span>Thêm văn bản</span>
							</div>

							<div className="add-music" onClick={handleShowMusicBox}>
								<i className="fa-solid fa-music fa-xl"></i>
								<span>Thêm nhạc</span>
							</div>

							{isMusicVisible && (
								<p className="music-url-box">
									<Input
										placeholder="Nhập đường link nhạc"
										onChange={handleMusicUrl}
									/>
								</p>
							)}
						</div>
					</div>
					<div className="action">
						{contextHolder}
						<Button type="primary" onClick={createNews}>
							Thêm vào tin
						</Button>
						<Button onClick={onCancel}>Hủy</Button>
					</div>
				</div>
			</Col>
			<Col span={16}>
				<div className="container-right">
					<div className="preview">
						<div className="title">Xem trước</div>

						<div className="background-box">
							<div className="content">
								<ImgCrop rotationSlider>
									<Upload
										customRequest={customRequest}
										listType="picture-card"
										fileList={fileList}
										onChange={onChange}
										onPreview={onPreview}
									>
										{fileList.length < 1 && "+ Upload"}
									</Upload>
								</ImgCrop>
							</div>
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
}

export default TypeImg;
