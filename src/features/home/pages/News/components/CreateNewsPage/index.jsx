import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import "./CreateNewsPage.scss";
import TypeImg from "./TypeImg";
import TypeText from "./TypeText";

function CreateNewsPage() {
	const [isImgClicked, setIsImgClicked] = useState(false);
	const [isTextClicked, setIsTextClicked] = useState(false);

	const handleImgClick = () => {
		setIsImgClicked(true);
	};

	const handleTextClick = () => {
		setIsTextClicked(true);
	};

	const handleCancel = () => {
		setIsImgClicked(false);
		setIsTextClicked(false);
	};

	if (isImgClicked) {
		return <TypeImg onCancel={handleCancel} />;
	}

	if (isTextClicked) {
		return <TypeText onCancel={handleCancel} />;
	}

	return (
		<Row>
			<Col span={8}>
				<div>Chỉnh sửa</div>
			</Col>
			<Col span={16}>
				<div className="create-news-container">
					<div className="create-img" onClick={handleImgClick}>
						<div className="icon">
							<i className="fa-solid fa-images fa-2xl"></i>
						</div>
						<div className="text">Tạo tin ảnh</div>
					</div>
					<div className="create-text" onClick={handleTextClick}>
						<div className="icon">
							<i className="fa-solid fa-font fa-2xl"></i>
						</div>
						<div className="text">Tạo tin dạng văn bản</div>
					</div>
				</div>
			</Col>
		</Row>
	);
}

export default CreateNewsPage;
