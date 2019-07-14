import axios from 'axios';
const BASEURL = process.env.REACT_APP_API_BASEURL;
export default class GifService {
  static async addGifToProfile(userId, gifData) {
    try {
      return await axios.post(BASEURL + 'gif', { userId, gifData });
    } catch (e) {
      throw e;
    }
  }

  static async getGif(id) {
    try {
      return await axios.get(BASEURL + 'gif/' + id);
    } catch (e) {
      throw e;
    }
  }

  static async getAllGifs(id) {
    try {
      return await axios.get(BASEURL + 'gifs');
    } catch (e) {
      throw e;
    }
  }

  static async updateGif(id, gifData) {
    try {
      return await axios.put(BASEURL + 'gif/' + id, { gifData });
    } catch (e) {
      throw e;
    }
  }

  static async deleteGif(id) {
    try {
      return await axios.delete(BASEURL + 'gif/' + id);
    } catch (e) {
      throw e;
    }
  }
}
