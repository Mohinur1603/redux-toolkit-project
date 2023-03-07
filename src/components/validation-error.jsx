import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
	const { error } = useSelector((state) => state.auth);
	const errorMessage = useCallback(() => {
		return Object.keys(error).map((name) => {
			const msg = error[name].join(", ");
			return `${name} - ${msg}`;
		});
	}, [error]);

	return (
		error !== null &&
		errorMessage().map((error) => {
			return (
				<div
					className='alert alert-danger text-start m-1 p-0'
					key={error}>
					{error}
				</div>
			);
		})
	);
};

export default ValidationError;
