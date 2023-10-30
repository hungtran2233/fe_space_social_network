import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./EditGender.scss";
import { Input, Modal, Select, Space, message } from "antd";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { updateGenderAction } from "features/authentication/action";

function EditGender(props) {
	const profile = props.profile;
	const dispatch = useDispatch();
	// message
	const [messageApi, contextHolder] = message.useMessage();
	const successMessage = () => {
		messageApi.open({
			type: "success",
			content: "Cập nhật giới tính thành công ",
		});
	};
	// Modal edit full name
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		// đóng modal
		setIsModalOpen(false);
		// call api
		updateGender(valueSelect);
		// hiển thị thông báo
		successMessage();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Select
	const [valueSelect, setValueSelect] = useState("male");
	const handleChange = (value) => {
		setValueSelect(value);
	};

	////// call api
	const updateGender = (valueGender) => {
		dispatch(updateGenderAction(valueGender));
	};

	return (
		<div className="edit-gender">
			{contextHolder}
			<EditOutlined style={{ fontSize: 24 }} onClick={showModal} />
			<Modal
				title="Chỉnh sửa giới tính"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="modal-edit-gender">
					<div className="label">Giới tính:</div>
					<div className="value-option">
						<Space wrap>
							<Select
								defaultValue={profile.user_info.gender}
								style={{
									width: 120,
								}}
								onChange={handleChange}
								options={[
									{
										value: "male",
										label: "Nam",
									},
									{
										value: "female",
										label: "Nữ",
									},
									{
										value: "other",
										label: "Khác",
									},
								]}
							/>
						</Space>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default EditGender;
