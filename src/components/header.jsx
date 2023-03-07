import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../constants";
import { removeItem } from "../helpers/storage";
import { logoutUser } from "../slice/auth";

const Header = () => {
	const { loggedIn, user } = useSelector((state) => state.auth);
	//bu functionlar logout uchun,1-navigate qilamiz, 2-removeItem qilib tokenni o'chirib yuvoramiz localstoragedan
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const logoutHandler = () => {
		dispatch(logoutUser());
		removeItem("token");
		navigate("/login");
	};
	return (
		<>
			<div className='d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom p-2 container'>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						width={"160"}
					/>
				</Link>

				<nav className='d-inline-flex mt-2 mt-md-0 ms-md-auto'>
					{loggedIn ? (
						<>
							<div className='me-3 py-2 text-dark text-decoration-none'>
								{user.username}
							</div>
							<Link
								className='me-3 p-2 text-dark text-decoration-none bg-light rounded'
								to='/create-article'>
								create article
							</Link>

							<button
								className='btn btn-outline-danger'
								onClick={logoutHandler}>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								className='me-3 py-2 text-dark text-decoration-none bg-light px-2 rounded'
								to='/login'>
								Login
							</Link>
							<Link
								className='me-3 py-2 text-dark text-decoration-none bg-light px-2 rounded'
								to='/register'>
								Register
							</Link>
						</>
					)}
				</nav>
			</div>
		</>
	);
};

export default Header;
