import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./EditWork.scss";
import { Input, Modal, message } from "antd";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { updateWorkAction } from "features/authentication/action";
import SchoolIcon from "@mui/icons-material/School";

function EditWork(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	// message
	const [messageApi, contextHolder] = message.useMessage();
	const successMessage = () => {
		messageApi.open({
			type: "success",
			content: "Cập nhật công việc thành công ",
		});
	};

	//////
	// Input
	const [valueInput, setValueInput] = useState(profile.user_info.working_at);
	const handleInputChange = (e) => {
		setValueInput(e.target.value);
	};

	////// call api
	const updateWork = (value) => {
		dispatch(updateWorkAction(value));
	};

	// Modal edit work
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		updateWork(valueInput);
		successMessage();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setValueInput(profile.user_info.working_at);
	};

	return (
		<div className="edit-work">
			{contextHolder}

			<div className="work-icon">
				<SchoolIcon sx={{ fontSize: 26, color: "gray" }} />
			</div>
			<div className="label">Tên nơi làm việc:</div>
			<div className="text-content">{profile.user_info.working_at}</div>

			<div className="edit-icon">
				<EditOutlined style={{ fontSize: 24 }} onClick={showModal} />
			</div>

			<Modal
				title="Chỉnh sửa nơi làm việc"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="modal-edit-work">
					<div className="label">Tên nơi làm việc:</div>
					<div className="value-option">
						<Input value={valueInput} onChange={handleInputChange} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default EditWork;
