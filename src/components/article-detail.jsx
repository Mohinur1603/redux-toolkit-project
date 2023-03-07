import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleService from "../service/article";
import {
	getArticleDetailFail,
	getArticleDetailStart,
	getArticleDetailSuccess,
} from "../slice/article";

const ArticleDetail = () => {
	const dispatch = useDispatch();
	//{articleDetail} slice/articlejs/articlesllice dan kelyapti.
	const { articleDetail } = useSelector((state) => state.article);

	const { id } = useParams();

	useEffect(() => {
		const getArticleDetail = async () => {
			getArticleDetailStart();
			try {
				const res = await ArticleService.getArticleDetail(id);
				dispatch(getArticleDetailSuccess(res.article));
			} catch (error) {
				getArticleDetailFail();
			}
		};
		getArticleDetail();
	}, [id, dispatch]);
	return (
		<>
			<div className='container-fluid py-5 bg-light my-5'>
				<h2 className='fw-bold'>{articleDetail?.title}</h2>
				<p className='col-md-8 fs-5 my-4'>{articleDetail?.description}</p>
				<p className='text-muted'>
					<span className='fw-bold'>Created : </span>
					{articleDetail?.createdAt.slice(0, 10)}
				</p>

				<div className='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm w-75 h-md-250 position-relative bg-white'>
					<div className='col p-4 d-flex flex-column position-static'>
						<p className='text-primary'>{articleDetail?.author.username}</p>
						<p className='card-text mb-auto'>
							{articleDetail?.title}
						</p>
					</div>
					<div className='col-auto d-none d-lg-block'>
						<img
							src='https://picsum.photos/200/300?random'
							className='bd-placeholder-img'
							width='200'
							height='200'
							alt='/'
						/>
					</div>
				</div>
				<p>{articleDetail?.body}</p>
			</div>
		</>
	);
};

export default ArticleDetail;
