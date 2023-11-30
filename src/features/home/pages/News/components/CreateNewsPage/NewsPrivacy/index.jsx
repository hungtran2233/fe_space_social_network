import React, { useState } from "react";
import "./NewsPrivacy.scss";
import { Modal } from "antd";

function NewsPrivacy({ getPrivacyId }) {
	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		// console.log(selectedPrivacy);
		getPrivacyId(selectedPrivacy);
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Radio button
	const [selectedPrivacy, setSelectedPrivacy] = useState("1");

	const onChangeRadio = (e) => {
		setSelectedPrivacy(e.target.value);
	};

	return (
		<div id="NewsPrivacy">
			<div className="btn-privacy" onClick={showModal}>
				<div className="btn-left">
					<i className="fa-solid fa-gear fa-xl"></i>
					<span>Quyền riêng tư của tin</span>
				</div>
				<div className="btn-right">
					{(selectedPrivacy === "1" && (
						<span className="status-icon">
							<i className="fa-solid fa-earth-americas fa-xl"></i>
						</span>
					)) ||
						(selectedPrivacy === "2" && (
							<span className="status-icon">
								<i className="fa-solid fa-user-group fa-xl"></i>
							</span>
						)) ||
						(selectedPrivacy === "3" && (
							<span className="status-icon">
								<i className="fa-solid fa-lock fa-xl"></i>
							</span>
						))}
				</div>
			</div>
			{/* {console.log(selectedPrivacy)} */}

			<Modal
				title="Quyền riêng tư của tin"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div id="ModalNewsPrivacy">
					<div className="describe">
						<div className="title">Ai có thể xem tin của bạn</div>
						<p>Tin của bạn sẽ hiển thị trong vòng 24h</p>
					</div>
					<div className="all-option">
						<label className="option" htmlFor="radio-1">
							<div className="icon">
								<i className="fa-solid fa-earth-americas fa-xl"></i>
							</div>
							<div className="description">
								<div className="des-title">Công khai</div>
								<div className="des-text">
									Tất cả những người trên ISpace
								</div>
							</div>
							<div className="btn-input">
								<input
									type="radio"
									name="privacy"
									value="1"
									id="radio-1"
									checked={selectedPrivacy === "1"}
									onChange={onChangeRadio}
								/>
							</div>
						</label>
						<label className="option" htmlFor="radio-2">
							<div className="icon">
								<i className="fa-solid fa-user-group fa-xl"></i>
							</div>
							<div className="description">
								<div className="des-title">Bạn bè</div>
								<div className="des-text">Chỉ bạn bè của bạn</div>
							</div>
							<div className="btn-input">
								<input
									type="radio"
									name="privacy"
									value="2"
									id="radio-2"
									onChange={onChangeRadio}
								/>
							</div>
						</label>
						<label className="option" htmlFor="radio-3">
							<div className="icon">
								<i className="fa-solid fa-lock fa-xl"></i>
							</div>
							<div className="description">
								<div className="des-title">Riêng tư</div>
								<div className="des-text">Chỉ một mình bạn</div>
							</div>
							<div className="btn-input">
								<input
									type="radio"
									name="privacy"
									value="3"
									id="radio-3"
									onChange={onChangeRadio}
								/>
							</div>
						</label>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default NewsPrivacy;
