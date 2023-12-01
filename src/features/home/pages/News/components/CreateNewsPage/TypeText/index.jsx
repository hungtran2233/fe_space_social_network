import { Button, Col, Input, Row, message, Select, Space, Radio } from "antd";

import React, { useEffect, useRef, useState } from "react";
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
	const [privacyId, setPrivacyId] = useState("2");
	// Lấy giá trị text area
	const [textValue, setTextValue] = useState("");
	// Lấy giá trị font chữ
	const [selectedFont, setSelectedFont] = useState("basic");
	// Lấy giá trị background
	const [selectedBackground, setSelectedBackground] = useState("bg-1");

	// ẩn hiện music box
	const [isMusicVisible, setMusicVisible] = useState(false);
	// Lấy giá trị music url
	const [musicUrl, setMusicUrl] = useState("");

	// test thử
	useEffect(() => {
		console.log(selectedBackground);
	}, [selectedBackground]);

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
	const handleValueInput = async (e) => {
		// console.log(e.target.value);
		await setTextValue(e.target.value);
	};

	// Lấy giá trị font chữ
	// Đối tượng ánh xạ giữa giá trị từ Select và tên của class
	const fontClassMapping = {
		basic: "basic-font-text",
		model: "model-font-text",
		classic: "classic-font-text",
		// Thêm các ánh xạ khác nếu cần
	};

	// Cập nhật giá trị font được chọn
	const handleGetFontStyle = (value) => {
		setSelectedFont(value);
	};

	// Lấy giá trị background
	const handleGetBackground = (e) => {
		setSelectedBackground(e.target.value);
	};

	// chuyển base64 thành File obj
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
							<NewsPrivacy getPrivacyId={getPrivacyId} />

							<div className="edit-content">
								<div className="add-text">
									<TextArea
										rows={3}
										style={{ resize: "none" }}
										placeholder="Hãy nhập văn bản"
										onChange={handleValueInput}
									/>
								</div>
								<div className="custom-font-style">
									<div className="icon">
										<i className="fa-solid fa-font fa-lg"></i>
									</div>
									<Select
										defaultValue="basic"
										style={{
											width: "90%",
											border: "none",
										}}
										bordered={false}
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
								<div className="custom-background">
									<div className="title">Phông nền</div>
									<div className="option-container">
										<label htmlFor="id-bg-1">
											<div className="btn-input">
												<input
													type="radio"
													name="bg-type"
													value="bg-1"
													id="id-bg-1"
													checked={
														selectedBackground === "bg-1"
													}
													onChange={handleGetBackground}
													style={{ display: "none" }}
												/>
											</div>
											<div
												className={`option ${
													selectedBackground === "bg-1"
														? "checked-radio-bg"
														: ""
												}`}
											>
												<img
													src="/image/news_background/default.jpg"
													alt=""
												/>
											</div>
										</label>
										<label htmlFor="id-bg-2">
											<div className="btn-input">
												<input
													type="radio"
													name="bg-type"
													value="bg-2"
													id="id-bg-2"
													onChange={handleGetBackground}
													style={{ display: "none" }}
												/>
											</div>
											<div
												className={`option ${
													selectedBackground === "bg-2"
														? "checked-radio-bg"
														: ""
												}`}
											>
												<img
													src="/image/news_background/noel.jpg"
													alt="Example"
												/>
											</div>
										</label>
										<label htmlFor="id-bg-3">
											<div className="btn-input">
												<input
													type="radio"
													name="bg-type"
													value="bg-3"
													id="id-bg-3"
													onChange={handleGetBackground}
													style={{ display: "none" }}
												/>
											</div>
											<div
												className={`option ${
													selectedBackground === "bg-3"
														? "checked-radio-bg"
														: ""
												}`}
											>
												<img
													src="/image/news_background/design-colors-blue.jpg"
													alt="Example"
												/>
											</div>
										</label>

										<label htmlFor="id-bg-4">
											<div className="btn-input">
												<input
													type="radio"
													name="bg-type"
													value="bg-4"
													id="id-bg-4"
													onChange={handleGetBackground}
													style={{ display: "none" }}
												/>
											</div>
											<div
												className={`option ${
													selectedBackground === "bg-4"
														? "checked-radio-bg"
														: ""
												}`}
											>
												<img
													src="/image/news_background/autumn.jpg"
													alt="Example"
												/>
											</div>
										</label>

										<label htmlFor="id-bg-5">
											<div className="btn-input">
												<input
													type="radio"
													name="bg-type"
													value="bg-5"
													id="id-bg-5"
													checked={
														selectedBackground === "bg-5"
													}
													onChange={handleGetBackground}
													style={{ display: "none" }}
												/>
											</div>
											<div
												className={`option ${
													selectedBackground === "bg-5"
														? "checked-radio-bg"
														: ""
												}`}
											>
												<img
													src="/image/news_background/dark-1.jpg"
													alt="Example"
												/>
											</div>
										</label>
									</div>
								</div>
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
							<div
								className="content"
								style={
									(selectedBackground === "bg-1" && {
										backgroundImage: `url("/image/news_background/default.jpg")`,
									}) ||
									(selectedBackground === "bg-2" && {
										backgroundImage: `url("/image/news_background/noel.jpg")`,
									}) ||
									(selectedBackground === "bg-3" && {
										backgroundImage: `url("/image/news_background/design-colors-blue.jpg")`,
									}) ||
									(selectedBackground === "bg-4" && {
										backgroundImage: `url("/image/news_background/autumn.jpg")`,
									}) ||
									(selectedBackground === "bg-5" && {
										backgroundImage: `url("/image/news_background/dark-1.jpg")`,
									})
								}
								ref={componentRef}
							>
								<div
									className={`text-value ${fontClassMapping[selectedFont]}`}
								>
									{textValue}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
}

export default TypeText;
