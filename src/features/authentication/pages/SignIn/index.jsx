import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import "./SignIn.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import Swal from "sweetalert2";
import { fetchProfileAction, signInAction } from "features/authentication/action";

const schema = yup.object({
	email: yup.string().required("*Trường này bắt buộc nhập ! "),
	pass_word: yup.string().required("*Trường này bắt buộc nhập ! "),
});

function SignIn() {
	const history = useHistory();
	const goToSignUp = () => {
		history.push("/sign-up");
	};

	const goBackPage = () => {
		history.push("/");
	};

	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			pass_word: "",
		},
		onSubmit: (values) => {
			signIn(values);
		},
		validationSchema: schema,
	});

	const signIn = async (userLoginType) => {
		const token = await dispatch(signInAction(userLoginType));
		// lưu profile lên redux
		if (!token && token !== "expires") {
			// message thông báo
			Swal.fire({
				title: "Error!",
				text: "Sai tài khoản hoặc mật khẩu, vui lòng nhập lại !",
				icon: "error",
				showConfirmButton: false,
				timer: 1500,
			});
			return;
		} else {
			// lưu profile vào redux
			await dispatch(fetchProfileAction);
			// alert("Đăng nhập thành công !");
			// Swal.fire({
			// 	position: "center",
			// 	icon: "success",
			// 	title: "Đăng nhập thành công !",
			// 	text: "Let'go !",
			// 	showConfirmButton: false,
			// 	timer: 1500,
			// });

			// Xóa hết lỗi 401 authorization ở console
			console.clear();

			goBackPage();
		}
	};

	return (
		<div id="SignIn" style={{ backgroundImage: "url(/bg/bgSignin.jpg)" }}>
			{/* {console.log(match.path)} */}
			<div className="content-signin">
				<h2 className="title">Đăng Nhập</h2>
				<UserOutlined className="icon-user" />

				<form onSubmit={formik.handleSubmit} className="form">
					<Input
						name="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="input"
						type="text"
						placeholder="Email"
						prefix={<MailOutlined style={{ marginRight: 8 }} />}
					/>

					{formik.touched.email && formik.errors.email && (
						<p className="errorText">{formik.errors.email}</p>
					)}

					<Input
						name="pass_word"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="input"
						type="password"
						placeholder="Mật khẩu"
						prefix={<LockOutlined style={{ marginRight: 8 }} />}
					/>
					{formik.touched.pass_word && formik.errors.pass_word && (
						<p className="errorText">{formik.errors.pass_word}</p>
					)}

					<div className="remember">
						<Checkbox>Lưu đăng nhập</Checkbox>
						<span className="forgot-password">Quên mật khẩu ?</span>
					</div>

					<Button
						className="btn-signin"
						htmlType="submit"
						type="primary"
						loading={isLoading}
					>
						Đăng nhập
					</Button>
				</form>

				<div className="signup-tips">
					<p>Chưa có tài khoản ?</p>
					<div className="btn-signup" onClick={goToSignUp}>
						Tạo tài khoản mới
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
