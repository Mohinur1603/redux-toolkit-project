import { Input, TextArea } from "./";

const ArticleForm = (prop) => {
	const {
		title,
		setTitle,
		description,
		setDescription,
		body,
		setBody,
		formSubmit,
	} = prop;
	return (
		<form onSubmit={formSubmit}>
			<div className='w-75 mx-auto'>
				<Input
					label={"Title"}
					state={title}
					setState={setTitle}
				/>
				<TextArea
					label={"Description"}
					state={description}
					setState={setDescription}
				/>
				<TextArea
					height='150px'
					label={"Body"}
					state={body}
					setState={setBody}
				/>
				<button
					className='btn btn-primary w-25 my-3'
					type='submit'>
					Create
				</button>
			</div>
		</form>
	);
};

export default ArticleForm;
