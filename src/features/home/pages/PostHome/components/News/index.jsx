import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./News.scss";
import CreateNews from "./components/CreateNews";

function News() {
	const arrNews = useSelector((state) => state.postStore.news);
	if (!arrNews)
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
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div id="News">
			<div className="create-news">
				<CreateNews />
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
									{/* {item.news_id} */}
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
