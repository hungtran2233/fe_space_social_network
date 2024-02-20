import React, { useState } from "react";

import { Badge, Popover, Space } from "antd";

function AllEventNotification(props) {
	const socket = props.socket;

	// button notification
	const [openIconNoti, setOpenIconNoti] = useState(false);
	const hideIconNoti = () => {
		setOpenIconNoti(false);
	};
	const handleOpenChangeIconNoti = (newOpen) => {
		setOpenIconNoti(newOpen);
	};

	// render content cho button User
	const renderContentIconNoti = () => {
		return (
			<div className="content-button-notification">
				<div className="item-option">
					<div className="text">Duy đã thêm một ảnh mới</div>
				</div>
				<div className="item-option">
					<div className="text">
						Ánh đã trả lời một bình luận mà bạn được gắn thẻ
					</div>
				</div>
				<div className="item-option">
					<div className="text">Ngọc đã đăng bài viết mới</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Popover
				content={renderContentIconNoti}
				title="Thông báo"
				trigger="click"
				open={openIconNoti}
				onOpenChange={handleOpenChangeIconNoti}
				placement="bottomLeft"
			>
				<div className="icon">
					<Space>
						<Badge
							count={5}
							offset={[10, -10]}
							style={{
								backgroundColor: "#764FFA",
								boxShadow: "none",
							}}
						>
							<div className="n-action">
								<i className="fa-solid fa-bell fa-lg"></i>
							</div>
						</Badge>
					</Space>
				</div>
			</Popover>
		</div>
	);
}

export default AllEventNotification;
