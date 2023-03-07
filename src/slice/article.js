import { createSlice } from "@reduxjs/toolkit";
//slice tuzamiz redux qonuni bo'yicha ..va buni store da ro'yxatdan o'tkazamiz

const initialState = {
	isLoading: false,
	articles: [],
	//cardni view qilganda chiqadigan oyna uchun, pastda unga mos slicelar yozdik va ularni kerakli joyda ishlatsak bo'lgani(ya'ni ArticleDetail da)
	articleDetail: null,
};
export const articleSlice = createSlice({
	name: "article",
	initialState,
	reducers: {
		getArticlesStart: (state) => {
			state.isLoading = true;
		},
		getArticlesSuccess: (state, action) => {
			state.isLoading = false;
			state.articles = action.payload;
		},
		getArticleFail: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		getArticleDetailStart: (state) => {
			state.isLoading = true;
		},
		getArticleDetailSuccess: (state, action) => {
			state.isLoading = false;
			state.articleDetail = action.payload;
		},
		getArticleDetailFail: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		postArticleStart: (state) => {
			state.isLoading = true;
		},
		postArticleSuccess: (state, action) => {
			state.isLoading = false;
			state.articles = action.payload;
		},
		postArticleFail: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});
export const {
	getArticlesStart,
	getArticlesSuccess,
	getArticleDetailFail,
	getArticleDetailSuccess,
	getArticleDetailStart,
	postArticleStart,
	postArticleSuccess,
	postArticleFail,
} = articleSlice.actions;

export default articleSlice.reducer;
