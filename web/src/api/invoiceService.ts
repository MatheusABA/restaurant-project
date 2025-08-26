import api from "./api";

class InvoiceService {

  async getAllInvoices(token: string) {
    const response = await api.get('/invoice/getAllInvoices',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    return response.data
  }

}

export default new InvoiceService();