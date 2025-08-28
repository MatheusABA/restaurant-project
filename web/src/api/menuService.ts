import api from "./api";

interface MenuItem {
  name: string;
  price: number;
  category: string;
  is_active: boolean
}


class MenuService {

  async createMenuItem(token: string, data: MenuItem) {
    const response = await api.post('/menu/createMenuItem', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  async getAllMenuItems(token: string) {
    const response = await api.get('/menu/getAllMenuItems', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data;
  }



}

export default new MenuService();