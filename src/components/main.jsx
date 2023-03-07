import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { getItem } from "../helpers/storage";
import { ArticlesUI, Loader } from "../ui-components";
import { useDispatch } from "react-redux";
import AuthService from "../service/auth";
import { signUserSuccess } from "../slice/auth";
import ArticleService from "../service/article";
import { getArticlesStart, getArticlesSuccess } from "../slice/article";

export default function Main() {
	const { articles, isLoading } = useSelector((state) => state.article); //map

	const dispatch = useDispatch();

	//Bu funksiya service dan ArticleService ni chaqirib beradi
	const getArticle = useCallback(async () => {
		getArticlesStart();
		try {
			const res = await ArticleService.getArticles();
			dispatch(getArticlesSuccess(res.articles));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	//Bu funksiya userni saqlab qoladi va refresh bo'lganida xam userni malumotlarni qaytaradi
	const getUser = useCallback(async () => {
		try {
			const res = await AuthService.getUser();
			dispatch(signUserSuccess(res.user));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	useEffect(() => {
		const token = getItem("token");
		if (token !== "") {
			getUser();
		}
		getArticle();
	}, [getArticle, getUser]);


	return (
		<>
			{isLoading && <Loader />}
			<div className='album py-5'>
				<div>
					<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
						{articles?.map((item, index) => (
							// <div
							// 	className='col'
							// 	key={item.title}>
							// 	<div className='card h-100 shadow-sm'>
							// 		<img
							// 			src={`https://picsum.photos/200/300?random=${index}`}
							// 			alt='/'
							// 			className='bd-placeholder-img card-img-top'
							// 			width='100%'
							// 			height='225'
							// 		/>
							// 		<div className='card-body'>
							// 			<p className='card-text'>{item.title}</p>
							// 		</div>
							// 		<div className='card-footer d-flex justify-content-between align-items-center'>
							// 			<div className='btn-group'>
							// 				<button
							// 					type='button'
							// 					className='btn btn-sm btn-primary'
							// 					onClick={() => navigate(`/article/${item.slug}`)}>
							// 					View
							// 				</button>
							// 				{loggedIn && item.author.username === user.username ? (
							// 					<>
							// 						<button
							// 							type='button'
							// 							className='btn btn-sm btn-success'
							// 							onClick={() =>
							// 								navigate(`/edit-article/${item.slug}`)
							// 							}>
							// 							Edit
							// 						</button>
							// 						<button
							// 							type='button'
							// 							className='btn btn-sm btn-danger'
							// 							onClick={() => deleteArticle(item.slug)}>
							// 							Delete
							// 						</button>
							// 					</>
							// 				) : (
							// 					""
							// 				)}
							// 			</div>
							// 			<small className='text-muted fw-bold'>
							// 				{item.author.username}
							// 			</small>
							// 		</div>
							// 	</div>
							// </div>
							<ArticlesUI item={item} index={index} getArticle={getArticle}/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
