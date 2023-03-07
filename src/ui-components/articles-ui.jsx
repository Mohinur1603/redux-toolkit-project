import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleService from "../service/article";

const ArticlesUI = ({ item, index, getArticle }) => {
	const { loggedIn, user } = useSelector((state) => state.auth);

	const navigate = useNavigate();

	// delete uchun
	const deleteArticle = async (slug) => {
		try {
			await ArticleService.deleteArticle(slug);
			getArticle();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div
			className='col'
			key={item.title}>
			<div className='card h-100 shadow-sm'>
				<img
					src={`https://picsum.photos/200/300?random=${index}`}
					alt='/'
					className='bd-placeholder-img card-img-top'
					width='100%'
					height='225'
				/>
				<div className='card-body'>
					<p className='card-text'>{item.title}</p>
				</div>
				<div className='card-footer d-flex justify-content-between align-items-center'>
					<div className='btn-group'>
						<button
							type='button'
							className='btn btn-sm btn-primary'
							onClick={() => navigate(`/article/${item.slug}`)}>
							View
						</button>
						{loggedIn && item.author.username === user.username ? (
							<>
								<button
									type='button'
									className='btn btn-sm btn-success'
									onClick={() => navigate(`/edit-article/${item.slug}`)}>
									Edit
								</button>
								<button
									type='button'
									className='btn btn-sm btn-danger'
									onClick={() => deleteArticle(item.slug)}>
									Delete
								</button>
							</>
						) : (
							""
						)}
					</div>
					<small className='text-muted fw-bold'>{item.author.username}</small>
				</div>
			</div>
		</div>
	);
};

export default ArticlesUI;
