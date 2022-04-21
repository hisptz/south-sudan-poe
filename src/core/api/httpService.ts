import axios from 'axios'

class HttpService {
  static baseURL: any = process.env.REACT_APP_BASEURL

  static async get(url: string) {
    return await axios
      .get(this.baseURL + url);
  }

  static async post(url: string, body: any) {
    return await axios
      .post(this.baseURL + url, body as JSON);
  }

 static async put(url: string, body: any) {
    return await axios
      .put(this.baseURL + url, body);
  }
}

export { HttpService }
