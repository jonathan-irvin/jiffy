import axios from 'axios';
const GIPHY_API = process.env.REACT_APP_GIPHY_API_KEY;
const GIPHY_BASEURL = process.env.REACT_APP_GIPHY_BASEURL;

class GiphyService {
  static async gifSearch(params) {
    let { q, limit, offset } = params;
    try {
      return await axios.get(GIPHY_BASEURL + 'gifs/search', {
        params: { api_key: GIPHY_API, q, limit, offset },
      });
    } catch (e) {
      throw e;
    }
  }

  static async getRandomGif(params) {
    let { tag } = params;
    try {
      return await axios.get(GIPHY_BASEURL + 'gifs/random', {
        params: { api_key: GIPHY_API, tag },
      });
    } catch (e) {
      throw e;
    }
  }

  static async getTrending(params) {
    let { limit, offset } = params;
    try {
      return await axios.get(GIPHY_BASEURL + 'gifs/trending', {
        params: { api_key: GIPHY_API, limit, offset },
      });
    } catch (e) {
      throw e;
    }
  }
}

export default GiphyService;
