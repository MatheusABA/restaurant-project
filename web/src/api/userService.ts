import api from "./api";

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

class UserService {
  async getAllUsers(token: string) {
    const response = await api.get("/user/getAllUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async getUserById(token: string, id: number) {
    const response = await api.get(`/user/getUserById/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data;
  }

  async createUser(token: string, data: UserData) {
    const response = await api.post("/user/createUser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async updateUser(token: string, id: number, data: UserData) {
    const response = await api.patch(`/user/updateUser/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  // Soft delete
  async deleteUser(token: string, id: number) {
    const response = await api.patch(`/user/deleteUser/${id}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  async activateUser(token: string, id: number) {
    const response = await api.patch(`/user/activateUser/${id}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  // Receive archived users
  async getArchivedUsers(token: string) {
    const response = await api.get("/user/getArchivedUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

export default new UserService();