import React, { useEffect } from "react";
import "./OUPAlbum.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAlbumAction } from "features/image/action";
import { Spin } from "antd";
import { useRouteMatch } from "react-router-dom";

function OUPAlbum() {
	// Lấy album của mình
	const arrOtherUserAlbum = useSelector(
		(state) => state.otherUserStore.otherUserImageList
	);

	if (!arrOtherUserAlbum)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	// render tên album
	const renderAlbumName = (name) => {
		if (name === "uploaded-images") {
			return "Ảnh đã tải lên";
		} else if ((name = "saved-images")) {
			return "Ảnh đã lưu";
		} else {
			return name;
		}
	};

	////
	const renderMyAlbum = (arrOtherUserAlbum) => {
		if (!arrOtherUserAlbum || arrOtherUserAlbum.length === 0) {
			return <div className="not-content">Không có album nào</div>;
		}

		return arrOtherUserAlbum.map((album) => {
			return (
				<div className="album-item" key={album.image_list_id}>
					<div className="al-image">
						{album.image.length > 0 ? (
							<img
								src={`http://localhost:8080/${album.image.at(-1).path}`}
								alt="album"
							/>
						) : (
							<img
								src={`${process.env.PUBLIC_URL}/image/no-image.jpg`}
								alt="no-image"
							/>
						)}
					</div>
					<div className="al-title">{renderAlbumName(album.list_name)}</div>
					<div className="img-count">
						<span>{album.image.length}</span> ảnh <span></span>
					</div>
				</div>
			);
		});
	};

	return (
		<div id="OUPAlbum">
			{/* {JSON.stringify(arrOtherUserAlbum)} */}
			<div className="title"> Album ảnh cá nhân</div>
			<div className="album">{renderMyAlbum(arrOtherUserAlbum)}</div>
		</div>
	);
}

export default OUPAlbum;
