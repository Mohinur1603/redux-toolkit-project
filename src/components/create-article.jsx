import { ArticleForm } from "../ui-components";
import { useState } from "react";
import ArticleService from "../service/article";
import { useDispatch } from "react-redux";
import {
	postArticleStart,
	postArticleSuccess,
	postArticleFail,
} from "../slice/article";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [body, setBody] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const formSubmit = async (e) => {
		e.preventDefault();
		const article = { title, description, body };
		dispatch(postArticleStart());
		try {
			await ArticleService.postArticle(article);
			dispatch(postArticleSuccess());
			navigate("/");
		} catch (error) {
			dispatch(postArticleFail());
			console.log(error);
		}
	};
	const prop = {
		title,
		setTitle,
		description,
		setDescription,
		body,
		setBody,
		formSubmit,
	};
	return (
		<>
			<div className='text-center'>
				<h3 className='display-5'>Create New Article</h3>
				<ArticleForm {...prop} />
			</div>
		</>
	);
};

export default CreateArticle;
