import api from "./api";

class UserService {
  async getAllUsers(token: string) {
    const response = await api.get("/user/getAllUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  }
}

export default new UserService();