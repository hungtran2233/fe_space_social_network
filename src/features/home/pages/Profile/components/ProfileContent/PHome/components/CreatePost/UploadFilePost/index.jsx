import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { createPostAction } from "features/home/action";
import axios from "axios";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function UploadFilePost(props) {
	// setup upload component antd
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState([]);
	//
	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
	};
	const handleChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		// Gọi hàm callback để truyền danh sách file lên component cha
		if (props.onFileUpload) {
			props.onFileUpload(newFileList);
		}
	};

	// button
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
					fontSize: 11,
					color: "gray",
				}}
			>
				Click để thêm ảnh
			</div>
		</div>
	);

	return (
		<div style={{ textAlign: "center" }}>
			<Upload
				// action={} // Sẽ thực hiện tải lên server tự động
				multiple
				listType="picture-card"
				customRequest={({ onSuccess, file }) => {
					// Không thực hiện tải lên tự động, chỉ cập nhật fileList
					onSuccess(null, file);
				}}
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length >= 8 ? null : uploadButton}
			</Upload>
			{/* {console.log(fileList)} */}
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt="example"
					style={{
						width: "100%",
					}}
					src={previewImage}
				/>
			</Modal>

			{/* <Button type="primary" onClick={() => createPost()}>
				Đăng
			</Button> */}
		</div>
	);
}

export default UploadFilePost;
