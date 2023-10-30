import { Button, Input, Space, Spin } from "antd";
import { socket } from "app/Socket";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SendBox.scss";

function SendBox(props) {
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	//
	const isInputEmpty = inputValue.trim() === "";

	// get data from props
	const { user_id, email, full_name, avatar, session } = props.userList;
	const { user_id: myId, full_name: myFullName, avatar: myAvatar } = props.myInfo;

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	// Tạo tin nhắn
	const handleSubmit = () => {
		// 1/ client gửi tin nhắn lên server
		if (!isInputEmpty) {
			socket.emit("createMessage", {
				conversation_id: localStorage.getItem("roomIdFromDB"),
				sender_id: myId,
				content: inputValue,
				created_at: new Date(),
			});
		}

		// Remove
		setInputValue("");
	};

	// Trạng thái 'typing'
	const handleKeyDown = (e) => {
		setIsTyping(true);
		socket.emit("userTyping", { myFullName, isTyping });
	};
	const handleBlur = (e) => {
		setIsTyping(false);
		socket.emit("userTyping", { myFullName, isTyping });
	};

	//
	useEffect(() => {}, []);

	return (
		<div id="SendBox">
			{/* {console.log(roomId)} */}
			<Space.Compact
				style={{
					width: "100%",
				}}
				size="large"
			>
				<Input
					placeholder="Hãy nhập tin nhắn..."
					onChange={handleInputChange}
					value={inputValue}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							e.preventDefault(); // Ngăn ngừa việc thêm dòng mới trong textarea
							handleSubmit();
						}
					}}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
				/>
				<Button
					type="primary"
					onClick={handleSubmit}
					htmlType="submit"
					disabled={isInputEmpty}
				>
					Gửi
				</Button>
			</Space.Compact>
		</div>
	);
}

export default SendBox;
