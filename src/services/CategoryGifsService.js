import axios from 'axios';
const BASEURL = process.env.REACT_APP_API_BASEURL;
export default class CategoryService {
  static async addGifToCategory(categoryId, gifId) {
    try {
      return await axios.post(
        BASEURL + 'category/' + categoryId + '/gif/' + gifId
      );
    } catch (e) {
      throw e;
    }
  }

  static async getCategoryGifs(id) {
    try {
      return await axios.get(BASEURL + 'category/' + id + '/gifs/');
    } catch (e) {
      throw e;
    }
  }

  static async removeGifFromCategory(id) {
    try {
      return await axios.delete(BASEURL + 'category/gif/' + id);
    } catch (e) {
      throw e;
    }
  }
}
