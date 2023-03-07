import React from "react";

const Input = ({ label, state, setState, type = "text" }) => {
	return (
		<div className='form-floating my-1'>
			<input
				type={type}
				className='form-control'
				placeholder={`${label}`}
				value={state}
				id={label}
				onChange={(e) => setState(e.target.value)}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
};

export default Input;
