import Axios from 'axios'

export function get(url, data) {
  return function () {
    return Axios.get(url, {
      params: data
    }).then((res) => {
      return promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
  }
}
