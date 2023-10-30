import React from "react";
import "./SidebarRight.scss";

function SidebarRight() {
	return (
		<div id="SidebarRight">
			<div className="weather-container">
				<img src={`${process.env.PUBLIC_URL}/image/weather.png`} alt="weather" />
			</div>
			<div className="birthday-container">
				<img
					src={`${process.env.PUBLIC_URL}/image/birthday.png`}
					alt="birthday"
				/>
			</div>
		</div>
	);
}

export default SidebarRight;
