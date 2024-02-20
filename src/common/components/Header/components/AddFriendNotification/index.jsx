import React, { useState } from "react";

import { Badge, Popover, Space } from "antd";

function AddFriendNotification() {
	// button Friend
	const [openFriend, setOpenFriend] = useState(false);
	const hideFriend = () => {
		setOpenFriend(false);
	};
	const handleOpenChangeFriend = (newOpen) => {
		setOpenFriend(newOpen);
	};

	// render content -- Friend
	const renderContentFriend = () => {
		return (
			<div className="content-button-friend">
				<div className="item-option">
					<div className="text">Loan đã gửi lời mời kết bạn</div>
				</div>
				<div className="item-option">
					<div className="text">Trung đã chấp nhận lời mời kết bạn</div>
				</div>
				<div className="item-option">
					<div className="text">Bình đã gửi lời mời kết bạn</div>
				</div>
			</div>
		);
	};
	return (
		<div>
			<Popover
				content={renderContentFriend}
				title="Bạn bè"
				trigger="click"
				open={openFriend}
				onOpenChange={handleOpenChangeFriend}
				placement="bottomLeft"
			>
				<div className="icon">
					<Space>
						<Badge
							count={5}
							offset={[10, -10]}
							style={{
								backgroundColor: "rgb(250, 173, 20)",
								boxShadow: "none",
							}}
						>
							<div className="n-friend">
								<i className="fa-solid fa-user fa-lg"></i>
							</div>
						</Badge>
					</Space>
				</div>
			</Popover>
		</div>
	);
}

export default AddFriendNotification;
