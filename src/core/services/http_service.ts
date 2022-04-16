import axios from 'axios'

class HttpService {
  baseURL: any = process.env.REACT_APP_BASEURL

  async getHttpService(url: string) {
    return await axios
      .get(this.baseURL + url)
      .then((response) => {
        return response
      })
      .catch((error) => {
      })
  }

  async postHttpService(url: string, body: any) {
    return await axios
      .post(this.baseURL + url, body as JSON)
      .then((response) => {
        return response
      })
      .catch((error) => {
      })
  }

  async putHttpService(url: string, body: any) {
    return await axios
      .put(this.baseURL + url, body)
      .then((response) => {
        return response
      })
      .catch((error) => {
      })
  }
}

export { HttpService }
