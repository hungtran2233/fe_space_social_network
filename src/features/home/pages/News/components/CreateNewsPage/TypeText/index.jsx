import { Button, Col, Input, Row, message, Select, Space } from "antd";

import React, { useRef, useState } from "react";
import "./TypeText.scss";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import NewsPrivacy from "../NewsPrivacy";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewsAction, createNewsTypeTextAction } from "../../../services/newsAction";

import html2canvas from "html2canvas";
import { formatStringForNews } from "common/utils/formatStringForNews";
const { TextArea } = Input;

function TypeText({ onCancel }) {
	const dispatch = useDispatch();
	// Chụp lại ảnh html
	const componentRef = useRef(null);
	const [imageData, setImageData] = useState(null);

	// lấy giá trị privacy
	const [privacyId, setPrivacyId] = useState("1");
	// Lấy giá trị text area
	const [textValue, setTextValue] = useState("");
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

	// Lấy giá trị text area
	const handleValueInput = (e) => {
		// console.log(e.target.value);
		setTextValue(e.target.value);
	};

	// Lấy giá trị font chữ
	const handleGetFontStyle = (value) => {
		console.log(`selected ${value}`);
	};

	//
	const dataURItoFile = (dataURI, filename) => {
		const byteString = atob(dataURI.split(",")[1]);
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);

		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new File([ab], filename, { type: "image/png" });
	};

	// Call api - tạo news
	const createNews = async () => {
		// chụp hình ảnh bằng html2canvas
		if (componentRef.current) {
			try {
				const canvas = await html2canvas(componentRef.current);
				const imgDataBase64 = canvas.toDataURL("image/png");

				// Tạo ngay kiểu dữ liệu File từ dữ liệu base64
				// Tham số đầu là URL-Base64, tham số 2 là tên của file (dùng hàm formatStringForNews tự định
				// nghĩa để định dạng lại tên của fileImg)
				const fileImg = dataURItoFile(
					imgDataBase64,
					formatStringForNews(textValue) + ".png"
				);

				// Call api
				await dispatch(
					createNewsTypeTextAction(fileImg, textValue, musicUrl, privacyId)
				);

				// hiển thị message tiến trình đăng tin
				openMessage();

				// chuyển hướng trang
				setTimeout(() => {
					history.push("/");
				}, 3000);
			} catch (error) {
				console.error("Lỗi khi chụp ảnh:", error);
			}
		}
	};

	return (
		<Row id="TypeText">
			{/* {console.log(privacyId)} */}
			<Col span={8}>
				<div className="container-left">
					<div className="all-action-news">
						<div className="title">Tin của bạn</div>
						<div className="control-news">
							<div className="add-privacy">
								<NewsPrivacy getPrivacyId={getPrivacyId} />
							</div>

							<div className="edit-content">
								<div className="add-text">
									<TextArea
										rows={4}
										style={{ resize: "none" }}
										placeholder="Hãy nhập văn bản"
										onChange={handleValueInput}
									/>
								</div>
								<div className="text-style">
									<Select
										defaultValue="basic"
										style={{
											width: 120,
										}}
										onChange={handleGetFontStyle}
										options={[
											{
												value: "basic",
												label: "Cơ bản",
											},
											{
												value: "model",
												label: "Hiện đại",
											},
											{
												value: "classic",
												label: "Cổ điển",
											},
										]}
									/>
								</div>
								<div className="text-background"></div>
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
							<div className="content" ref={componentRef}>
								<div className="text-value">{textValue}</div>
							</div>
						</div>
					</div>
					{/* Hiển thị ảnh */}
					{imageData && <img src={imageData} alt="Chụp ảnh" />}
				</div>
			</Col>
		</Row>
	);
}

export default TypeText;
