import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./EditFavorites.scss";
import { Input, Modal, message } from "antd";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { updateFavoritesAction } from "features/authentication/action";
import SchoolIcon from "@mui/icons-material/School";

function EditFavorites(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	// message
	const [messageApi, contextHolder] = message.useMessage();
	const successMessage = () => {
		messageApi.open({
			type: "success",
			content: "Cập nhật sở thích thành công ",
		});
	};

	//////
	// Input
	const [valueInput, setValueInput] = useState(profile.user_info.favorites);
	const handleInputChange = (e) => {
		setValueInput(e.target.value);
	};

	////// call api
	const updateFavorites = (value) => {
		dispatch(updateFavoritesAction(value));
	};

	// Modal edit work
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		updateFavorites(valueInput);
		successMessage();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setValueInput(profile.user_info.favorites);
	};

	return (
		<div className="edit-favorites">
			{contextHolder}

			<div className="work-icon">
				<SchoolIcon sx={{ fontSize: 26, color: "gray" }} />
			</div>
			<div className="label">Sở thích:</div>
			<div className="text-content">{profile.user_info.favorites}</div>

			<div className="edit-icon">
				<EditOutlined style={{ fontSize: 24 }} onClick={showModal} />
			</div>

			<Modal
				title="Chỉnh sửa sở thích"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="modal-edit-favorites">
					<div className="label">Sở thích:</div>
					<div className="value-option">
						<Input value={valueInput} onChange={handleInputChange} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default EditFavorites;
