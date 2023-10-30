import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./EditAge.scss";
import { Input, Modal, message } from "antd";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { updateAgeAction, updateFullNameAction } from "features/authentication/action";

function EditAge(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	// message
	const [messageApi, contextHolder] = message.useMessage();
	const successMessage = () => {
		messageApi.open({
			type: "success",
			content: "Cập nhật tuổi thành công ",
		});
	};

	//////
	// Input
	const [valueInput, setValueInput] = useState(profile.user_info.age);
	const handleInputChange = (e) => {
		setValueInput(e.target.value);
	};

	////// call api
	const updateAge = (value) => {
		dispatch(updateAgeAction(value));
	};

	// Modal edit full name
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		updateAge(valueInput);
		successMessage();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setValueInput(profile.user_info.age);
	};

	return (
		<div className="edit-age">
			{contextHolder}
			<EditOutlined style={{ fontSize: 24 }} onClick={showModal} />
			<Modal
				title="Chỉnh sửa tuổi"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="modal-edit-age">
					<div className="label">Tuổi của bạn:</div>
					<div className="value-option">
						<Input value={valueInput} onChange={handleInputChange} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default EditAge;
