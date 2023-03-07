import axios from "./api";

export const AuthService = {
	async registerUser(user) {
		const { data } = await axios.post("/users", { user });
		return data;
	},
	async loginUser(user) {
		const { data } = await axios.post("/users/login", { user });
		return data;
	},
	async getUser() {
		const { data } = await axios.get("/user");
		return data;
	},
};
export default AuthService;
