import React, { useEffect, useRef, useState } from "react";
import { socket } from "app/Socket";
import moment from "moment-timezone";
import "./GroupContent.scss";
import { Spin } from "antd";

function GroupContent(props) {
	// messages có dạng: {conversation_id: string, sender_id: number, content: string;}
	const [messages, setMessages] = useState([]);
	// Tự động cuộn xuống tin nhắn mới nhất
	const messageContentRef = useRef(null);
	/////////////
	const conversationInfo = props.conversationInfo;
	const members = conversationInfo.members;
	const { user_id: myId, full_name: myFullName, avatar: myAvatar } = props.myInfo;

	useEffect(() => {
		// real-time nhắn tin
		socket.on("onMessage", (data) => {
			// Kiểm tra xem tin nhắn có thuộc roomId của component không
			if (data.conversation_id === localStorage.getItem("roomIdFromDB")) {
				setMessages((prevMessages) => [...prevMessages, data]);
			}
		});

		// Xử lý sự kiện loadMessages để load tin nhắn cũ khi tham gia room
		socket.on("loadMessages", (data) => {
			setMessages(data);
		});

		// Đảm bảo ngừng lắng nghe khi component unmount
		return () => {
			socket.off("onMessage");
			socket.off("loadMessages");
		};
	}, []);

	// Tự động cuộn xuống dưới khi có tin nhắn mới
	useEffect(() => {
		if (messageContentRef.current) {
			messageContentRef.current.scrollTop = messageContentRef.current.scrollHeight;
		}
	}, [messages]);

	// Mapping messages với members để lấy ra avatar, full_name người gửi tin nhắn
	if (!messages)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	const mergedMessages = messages.map((message) => {
		const member = members.find((member) => member.user_id === message.sender_id);
		return {
			conversation_id: message.conversation_id,
			sender_id: message.sender_id,
			content: message.content,
			avatar: member.avatar,
			full_name: member.full_name,
		};
	});

	const renderMyMessage = (message) => {
		return (
			<div className="my-message">
				<div className="box-content">
					<div className="text">{message.content}</div>

					<div className="time">
						{moment(message.created_at)
							.tz("Asia/Ho_Chi_Minh")
							.format("YYYY-MM-DD HH:mm")}
					</div>
				</div>
			</div>
		);
	};

	const renderOtherUserMessage = (message) => {
		return (
			<div className="other-user-message">
				<div className="user-avatar">
					<img src={`http://localhost:8080/${message.avatar}`} alt="avatar" />
				</div>

				<div className="box-content">
					<div className="full-name">
						<span>{message.full_name}</span>
					</div>
					<div className="text">{message.content}</div>

					<div className="time">
						{moment(message.created_at)
							.tz("Asia/Ho_Chi_Minh")
							.format("YYYY-MM-DD HH:mm")}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div id="GroupContent" ref={messageContentRef}>
			{mergedMessages.map((message, index) => (
				<div key={index} className="user-message">
					{message.sender_id === myId
						? renderMyMessage(message)
						: renderOtherUserMessage(message)}
				</div>
			))}
		</div>
	);
}

export default GroupContent;
