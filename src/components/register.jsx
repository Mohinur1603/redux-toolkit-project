import React, { useEffect, useState } from "react";
import { Input } from "../ui-components";
import { useSelector, useDispatch } from "react-redux";
import { signUserStart, signUserFail, signUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "./";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPasword] = useState("");

	const navigate = useNavigate();

	const { isLoading, loggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	//registreted
	const registerHandler = async (e) => {
		e.preventDefault();
		dispatch(signUserStart());
		const user = { username, email, password };
		try {
			const res = await AuthService.registerUser(user);
			dispatch(signUserSuccess(res.user));
			navigate("/");
		} catch (error) {
			console.log(error);
			dispatch(signUserFail(error.response.data.errors));
		}
	};
	//useEffect bilan shunday logika qilamizki, bunda agar user register yoki login qilganda qayta register yoki login qilolmaydi.
	useEffect(() => {
		//loggedIn true bo'lganda home ga navigatsiya qilamiz
		if (loggedIn) {
			navigate("/");
		}
	}, [loggedIn,navigate]);

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
					<h1 className='h3 mb-3 fw-normal'>Please Register</h1>
					<div className='mt-2'>
						<ValidationError />
					</div>
					<Input
						label={"Username"}
						setState={setUsername}
						state={username}
					/>
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
						type='submit'
						onClick={registerHandler}
						disabled={isLoading}>
						{isLoading ? "Loading..." : "Register"}
					</button>
					<p className='mt-5 mb-3 text-muted'>©2023</p>
				</form>
			</main>
		</div>
	);
};

export default Register;
