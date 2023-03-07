import React from "react";

const TextArea = ({ label, state, setState, height = "70px" }) => {
	return (
		<div className='form-floating my-1'>
			<textarea
				className='form-control'
				placeholder={`${label}`}
				id={label}
				height={height}
				value={state}
				onChange={(e) => setState(e.target.value)}
				style={{ height: height }}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
};

export default TextArea;
