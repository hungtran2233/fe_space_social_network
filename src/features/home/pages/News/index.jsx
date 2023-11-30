import React from "react";
import { useSelector } from "react-redux";
import { Button, Spin } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./News.scss";
import { useHistory } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

function News() {
	const arrNews = useSelector((state) => state.newsStore.news);
	const myInfo = useSelector((state) => state.auth.profile);

	const history = useHistory();

	const redirectCreateNews = () => {
		history.push("/news/create");
	};

	if (!arrNews)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	if (!myInfo)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="middle" />;
			</div>
		);

	// Custom arrow react slick
	function SampleNextArrow(props) {
		const { className, onClick } = props;
		return <div className={`custom-next-arrow ${className}`} onClick={onClick} />;
	}

	function SamplePrevArrow(props) {
		const { className, onClick } = props;
		return <div className={`custom-prev-arrow ${className}`} onClick={onClick} />;
	}

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		// autoplay: true,
		// autoplaySpeed: 2000,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div id="News">
			<div className="create-news" onClick={redirectCreateNews}>
				<div className="img-add-news">
					<img src={`http://localhost:8080/${myInfo.avatar}`} alt="avatar" />
				</div>

				<div className="btn-add-news">
					<PlusCircleOutlined
						style={{ fontSize: 30, fontWeight: 100, color: "#fa6342" }}
					/>
				</div>
				<div className="text-add-news">Tạo tin</div>
			</div>

			<div className="all-news">
				<Slider {...settings}>
					{arrNews.map((item) => {
						return (
							<div key={item.news_id} className="card">
								<div className="card-img">
									<img
										src={
											"http://localhost:8080/public/img/" +
											decodeURIComponent(item.path)
										}
										alt=""
									/>
								</div>
								<div className="card-avatar">
									<img
										src={
											"http://localhost:8080/" +
											decodeURIComponent(item.avatar)
										}
										alt=""
									/>
								</div>

								<div className="card-full-name">{item.full_name}</div>
							</div>
						);
					})}
				</Slider>
			</div>
		</div>
	);
}

export default News;
