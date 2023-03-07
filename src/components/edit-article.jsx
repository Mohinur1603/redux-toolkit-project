import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ArticleService from "../service/article";
import {
	getArticleDetailFail,
	getArticleDetailStart,
	getArticleDetailSuccess,
	postArticleFail,
	postArticleStart,
	postArticleSuccess,
} from "../slice/article";
import { ArticleForm } from "../ui-components";

const EditArticle = () => {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [body, setBody] = useState();

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formSubmit = async (e) => {
		e.preventDefault();
		const article = { title, description, body };
		dispatch(postArticleStart());
		try {
			await ArticleService.editArticle(id,article);
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

	useEffect(() => {
		const getArticleDetail = async () => {
			getArticleDetailStart();
			try {
				const res = await ArticleService.getArticleDetail(id);
				setTitle(res.article.title);
				setDescription(res.article.description);
				setBody(res.article.body);
				dispatch(getArticleDetailSuccess(res.article));
			} catch (error) {
				getArticleDetailFail();
			}
		};
		getArticleDetail();
	}, [id, dispatch]);

	return (
		<>
			<div className='text-center'>
				<h3 className='display-5'>Edit Article</h3>
				<ArticleForm {...prop} />
			</div>
		</>
	);
};

export default EditArticle;
