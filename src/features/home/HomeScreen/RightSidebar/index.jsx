import React from "react";
import "./RightSidebar.scss";

function RightSidebar() {
	return (
		<div id="RightSidebar">
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

export default RightSidebar;
