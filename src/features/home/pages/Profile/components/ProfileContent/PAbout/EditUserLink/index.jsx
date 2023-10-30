import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./EditUserLink.scss";
import { Input, Modal, message } from "antd";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import ShareIcon from "@mui/icons-material/Share";

function EditUserLink(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	// message
	const [messageApi, contextHolder] = message.useMessage();
	const successMessage = () => {
		messageApi.open({
			type: "success",
			content: "Cập nhật liên kết cá nhân thành công ",
		});
	};
	// Modal edit full name
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		// updateFullName();
		successMessage();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setValueInput(profile.link_url);
	};

	// Input
	const [valueInput, setValueInput] = useState(profile.link_url);
	const handleInputChange = (e) => {
		setValueInput(e.target.value);
	};

	////// call api
	// const updateUserLink = async () => {
	// 	try {
	// 		const res = await instance.request({
	// 			url: "/auth/update-user-info",
	// 			method: "PUT",
	// 			data: {
	// 				full_name: valueInput,
	// 			},
	// 		});

	// 		dispatch({
	// 			type: "auth/UPDATE_FULL_NAME",
	// 			payload: res.data.content.full_name,
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<div className="edit-user-link">
			{contextHolder}
			<EditOutlined style={{ fontSize: 24 }} onClick={showModal} />
			<Modal
				title="Chỉnh sửa liên kết cá nhân"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={600}
			>
				<div className="modal-edit-user-link">
					<div className="label">
						<ShareIcon sx={{ fontSize: 26, color: "gray" }} />
					</div>
					<div className="value-option">
						<span>http://localhost:3000/profile/</span>
						<Input value={valueInput} onChange={handleInputChange} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default EditUserLink;
