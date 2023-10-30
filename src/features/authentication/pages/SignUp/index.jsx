import React from "react";
import "./SignUp.scss";
import { Button, Input } from "antd";
import { useFormik } from "formik";

function SignUp() {
	const formik = useFormik({
		initialValues: { email: "", pass_word: "", full_name: "" },
	});

	return (
		<div id="SignUp">
			<h2 className="title">Sign Up</h2>
			<form className="form" action="">
				<Input
					name="email"
					onChange={formik.handleChange}
					className="input"
					type="text"
					placeholder="Email"
				/>
				<Input name="pass_word" className="input" type="text" placeholder="Password" />
				<Input className="input" type="text" placeholder="Full Name" />
				<Button type="primary">Submit</Button>
			</form>
		</div>
	);
}

export default SignUp;
