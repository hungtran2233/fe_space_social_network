import { socket } from "app/Socket";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import "./PersonalContent.scss";

function PersonalContent(props) {
	const { user_id, email, full_name, avatar, is_online } = props.userList;
	const { user_id: myId, full_name: myFullName, avatar: myAvatar } = props.myInfo;
	// messages có dạng: {conversation_id: string, sender_id: number, content: string;}
	const [messages, setMessages] = useState([]);
	// Tự động cuộn xuống tin nhắn mới nhất
	const messageContentRef = useRef(null);
	// Sự kiện 'typing'
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		// real-time nhắn tin
		socket.on("onMessage", (data) => {
			// Kiểm tra xem tin nhắn có thuộc roomId của component không
			if (data.conversation_id === localStorage.getItem("roomIdFromDB")) {
				setMessages((prevMessages) => [...prevMessages, data]);
			}
		});

		// Xử lý sự kiện loadMessages để load tin nhắn khi tham gia room
		socket.on("loadMessages", (data) => {
			setMessages(data);
		});

		// Sự kiện 'typing'
		socket.on("typing", (data) => {
			setIsTyping(data.isTyping);
		});

		// Đảm bảo ngừng lắng nghe khi component unmount
		return () => {
			socket.off("onMessage");
			socket.off("loadMessages");
			socket.off("typing");
		};
	}, []);

	// Tự động cuộn xuống dưới khi có tin nhắn mới
	useEffect(() => {
		if (messageContentRef.current) {
			messageContentRef.current.scrollTop = messageContentRef.current.scrollHeight;
		}
	}, [messages]);

	const renderMyMessage = (message) => {
		return (
			<div className="my-message">
				{/* {console.log(isTyping)} */}
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
				{is_online === true ? (
					<div className="user-avatar is-online">
						<img src={`http://localhost:8080/${avatar}`} alt="avatar" />
					</div>
				) : (
					<div className="user-avatar">
						<img src={`http://localhost:8080/${avatar}`} alt="avatar" />
					</div>
				)}
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

	return (
		<div id="PersonalContent" ref={messageContentRef}>
			{messages.map((message, index) => (
				<div key={index} className="user-message">
					{message.sender_id === myId
						? renderMyMessage(message)
						: renderOtherUserMessage(message)}
				</div>
			))}
		</div>
	);
}

export default PersonalContent;
