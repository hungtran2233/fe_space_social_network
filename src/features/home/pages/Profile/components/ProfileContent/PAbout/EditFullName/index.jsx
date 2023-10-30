import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./EditFullName.scss";
import { Input, Modal, message } from "antd";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { updateFullNameAction } from "features/authentication/action";

function EditFullName(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	// message
	const [messageApi, contextHolder] = message.useMessage();
	const successMessage = () => {
		messageApi.open({
			type: "success",
			content: "Cập nhật họ tên thành công ",
		});
	};

	//////
	// Input
	const [valueInput, setValueInput] = useState(profile.full_name);
	const handleInputChange = (e) => {
		setValueInput(e.target.value);
	};

	////// call api
	const updateFullName = (value) => {
		dispatch(updateFullNameAction(value));
	};

	// Modal edit full name
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		updateFullName(valueInput);
		successMessage();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setValueInput(profile.full_name);
	};

	return (
		<div className="edit-full-name">
			{contextHolder}
			<EditOutlined style={{ fontSize: 24 }} onClick={showModal} />
			<Modal
				title="Chỉnh sửa họ tên"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="modal-edit-full-name">
					<div className="label">Họ tên:</div>
					<div className="value-option">
						<Input value={valueInput} onChange={handleInputChange} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default EditFullName;
