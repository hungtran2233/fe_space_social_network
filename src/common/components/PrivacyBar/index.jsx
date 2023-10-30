import React from "react";
import "./PrivacyBar.scss";
import { Select, Space } from "antd";
import PublicIcon from "@mui/icons-material/Public";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";

const handleChange = (value) => {
	console.log(`selected ${value}`);
};

function PrivacyBar() {
	return (
		<Space wrap className="custom-privacy-bar">
			<Select
				defaultValue="1"
				style={{
					width: 140,
				}}
				onChange={handleChange}
				options={[
					{
						value: "1",
						label: (
							<span>
								<PublicIcon sx={{ fontSize: 18 }} />
								<span style={{ marginLeft: 5 }}>Công khai</span>
							</span>
						),
					},
					{
						value: "2",
						label: (
							<span>
								<PeopleAltIcon sx={{ fontSize: 18 }} />
								<span style={{ marginLeft: 5 }}>Bạn bè</span>
							</span>
						),
					},
					{
						value: "3",
						label: (
							<span>
								<LockIcon sx={{ fontSize: 18 }} />
								<span style={{ marginLeft: 5 }}>Riêng tư</span>
							</span>
						),
					},
				]}
			/>
		</Space>
	);
}

export default PrivacyBar;
