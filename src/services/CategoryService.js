import axios from 'axios';
const BASEURL = process.env.REACT_APP_API_BASEURL;
export default class CategoryService {
  static async createCategory(userId, categoryName) {
    try {
      return await axios.post(BASEURL + 'category', {
        userId: userId,
        categoryName: categoryName,
      });
    } catch (e) {
      throw e;
    }
  }

  static async getCategory(id) {
    try {
      return await axios.get(BASEURL + 'category/' + id);
    } catch (e) {
      throw e;
    }
  }

  static async getAllCategories() {
    try {
      return await axios.get(BASEURL + 'categories');
    } catch (e) {
      throw e;
    }
  }

  static async updateCategory(id, categoryName) {
    try {
      return await axios.put(BASEURL + 'category/' + id, {
        categoryName: categoryName,
      });
    } catch (e) {
      throw e;
    }
  }

  static async deleteCategory(id) {
    try {
      return await axios.delete(BASEURL + 'category/' + id);
    } catch (e) {
      throw e;
    }
  }
}
