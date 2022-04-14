import axios from 'axios'

class HttpService {
  baseURL: any = process.env.REACT_APP_BASEURL

  async getHttpService(url: string) {
    return await axios
      .get(this.baseURL + url)
      .then((response) => {
        console.log({ response })
      })
      .catch((error) => {
        console.log({ error })
      })
  }

  async postHttpService(url: string, body: any) {
    return await axios
      .post(this.baseURL + url, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      .then((response) => {
        console.log({ response })
      })
      .catch((error) => {
        console.log({ error })
      })
  }

  async putHttpService(url: string, body: any) {
    return await axios
      .put(this.baseURL + url, body)
      .then((response) => {
        console.log({ response })
      })
      .catch((error) => {
        console.log({ error })
      })
  }
}

export { HttpService }
