import React from "react";
import "./GroupIcon.scss";

function GroupIcon(props) {
	const members = props.groupInfo.members;

	return (
		<div id="GroupIcon">
			<div className="icon-container">
				{members.map((user) => (
					<div className="user-avatar" key={user.user_id}>
						{/* {user.user_id} */}
						<img src={`http://localhost:8080/${user.avatar}`} alt="" />
					</div>
				))}
			</div>
		</div>
	);
}

export default GroupIcon;
