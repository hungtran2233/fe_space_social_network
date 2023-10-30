import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./EditSchool.scss";
import { Input, Modal, message } from "antd";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { updateFullNameAction, updateSchoolAction } from "features/authentication/action";
import SchoolIcon from "@mui/icons-material/School";

function EditSchool(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	// message
	const [messageApi, contextHolder] = message.useMessage();
	const successMessage = () => {
		messageApi.open({
			type: "success",
			content: "Cập nhật trường học thành công ",
		});
	};

	//////
	// Input
	const [valueInput, setValueInput] = useState(profile.user_info.study_at);
	const handleInputChange = (e) => {
		setValueInput(e.target.value);
	};

	////// call api
	const updateSchool = (value) => {
		dispatch(updateSchoolAction(value));
	};

	// Modal edit school
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		updateSchool(valueInput);
		successMessage();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setValueInput(profile.user_info.study_at);
	};

	return (
		<div className="edit-school">
			{contextHolder}

			<div className="school-icon">
				<SchoolIcon sx={{ fontSize: 26, color: "gray" }} />
			</div>
			<div className="label">Tên trường:</div>
			<div className="text-content">{profile.user_info.study_at}</div>

			<div className="edit-icon">
				<EditOutlined style={{ fontSize: 24 }} onClick={showModal} />
			</div>

			<Modal
				title="Chỉnh sửa nơi học tập"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="modal-edit-school">
					<div className="label">Tên trường:</div>
					<div className="value-option">
						<Input value={valueInput} onChange={handleInputChange} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default EditSchool;
