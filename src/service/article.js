import axios from "./api";
//Cardlar uchun server

const ArticleService = {
	async getArticles() {
		const { data } = await axios.get("/articles");
		return data;
	},
	// bu card ni view qilinganda chiqadigan oynasi uchun, buni slice da xam davom ettiramiz
	async getArticleDetail(slug) {
		const { data } = await axios.get(`articles/${slug}`);
		return data;
	},
	//bu yangi article create qilish uchun.Api dagi articles ga post zapros yuboramiz va create-article dagi forma malumotlari bilan to'ldiramiz
	async postArticle(article) {
		const { data } = await axios.post("/articles", { article });
		return data;
	},

	async deleteArticle(slug) {
		const { data } = await axios.delete(`/articles/${slug}`);
		return data;
	},
	async editArticle(slug, article) {
		const { data } = await axios.put(`/articles/${slug}`, { article });
		return data;
	},
};

export default ArticleService;
