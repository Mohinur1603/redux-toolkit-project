import React, { useEffect, useState } from "react";
import { Input } from "../ui-components";
import { useSelector, useDispatch } from "react-redux";
import { signUserFail, signUserStart, signUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "./";
import { useNavigate } from "react-router-dom";

const Login = () => {
	//Bu statelar login uchun
	const [email, setEmail] = useState("");
	const [password, setPasword] = useState("");

	//Navigatsiya qilamiz, login bo'lganda bosh saxifaga o'tishi uchun.login yoki registratsiya bosilganda navigate ga ("/") qo'yamiz: 28-qator
	const navigate = useNavigate();

	//Agar foydalanuvchi logged bo'lsa true bo'ladi, isloading false bo'ladi
	const { isLoading, loggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const loginHandler = async (e) => {
		e.preventDefault();
		dispatch(signUserStart());
		const user = { email, password };
		try {
			const res = await AuthService.loginUser(user);
			dispatch(signUserSuccess(res.user));
			navigate("/");
		} catch (error) {
			dispatch(signUserFail(error.response.data.errors));
		}
	};

	useEffect(() => {
		const path = "/";
		if (loggedIn) {
			navigate(path);
		}
	}, [loggedIn, navigate]);

	return (
		<div className='text-center'>
			<main className='form-signin w-25 m-auto'>
				<form>
					<img
						className='mb-4'
						src='https://cdn-icons-png.flaticon.com/512/9450/9450450.png'
						alt=''
						width='50'
					/>
					<h1 className='h3 mb-3 fw-normal'>Please Login</h1>
					<div className='mt-2'>
						{(loggedIn && "welcome!") || <ValidationError />}
					</div>
					<Input
						label={"Email"}
						state={email}
						setState={setEmail}
					/>
					<Input
						label={"Password"}
						state={password}
						setState={setPasword}
						type={"password"}
					/>

					<button
						className='w-100 btn btn-lg btn-primary mt-3'
						onClick={loginHandler}
						type='submit'
						disabled={isLoading}>
						{isLoading ? "Loading.." : "Login"}
					</button>
					<p className='mt-5 mb-3 text-muted'>©2023</p>
				</form>
			</main>
		</div>
	);
};

export default Login;
