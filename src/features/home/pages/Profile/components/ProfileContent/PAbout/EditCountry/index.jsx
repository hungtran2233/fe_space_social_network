import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./EditCountry.scss";
import { Input, Modal, message } from "antd";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { updateCountryAction } from "features/authentication/action";
import SchoolIcon from "@mui/icons-material/School";

function EditCountry(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	// message
	const [messageApi, contextHolder] = message.useMessage();
	const successMessage = () => {
		messageApi.open({
			type: "success",
			content: "Cập nhật nơi sống thành công ",
		});
	};

	//////
	// Input
	const [valueInput, setValueInput] = useState(profile.user_info.country);
	const handleInputChange = (e) => {
		setValueInput(e.target.value);
	};

	////// call api
	const updateCountry = (value) => {
		dispatch(updateCountryAction(value));
	};

	// Modal edit work
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		updateCountry(valueInput);
		successMessage();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setValueInput(profile.user_info.country);
	};

	return (
		<div className="edit-country">
			{contextHolder}

			<div className="country-icon">
				<SchoolIcon sx={{ fontSize: 26, color: "gray" }} />
			</div>
			<div className="label">Tên nơi sinh sống:</div>
			<div className="text-content">{profile.user_info.country}</div>

			<div className="edit-icon">
				<EditOutlined style={{ fontSize: 24 }} onClick={showModal} />
			</div>

			<Modal
				title="Chỉnh sửa nơi sinh sống"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="modal-edit-country">
					<div className="label">Tên nơi sinh sống:</div>
					<div className="value-option">
						<Input value={valueInput} onChange={handleInputChange} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default EditCountry;
