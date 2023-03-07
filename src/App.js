import React from "react";
import { Routes, Route } from "react-router-dom";
import {
	Main,
	Login,
	Register,
	Header,
	ArticleDetail,
	CreateArticle,
	EditArticle,
} from "./components";

const App = () => {
	return (
		<>
			<Header />
			<div className='container'>
				<Routes>
					<Route
						path='/'
						element={<Main />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='/article/:id'
						element={<ArticleDetail />}
					/>
					<Route
						path='/create-article'
						element={<CreateArticle />}
					/>
					<Route
						path='/edit-article/:id'
						element={<EditArticle />}
					/>
				</Routes>
			</div>
		</>
	);
};

export default App;
