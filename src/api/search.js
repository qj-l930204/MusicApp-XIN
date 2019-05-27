import Axios from 'axios'
import { commonParams } from './config'

export function getHotKey () {
  // https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
  // ?_=1555062465388&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1
  const url = '/recommend/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    format: 'json',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

export function search (query, page, zhida, perpage) {
  // https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp
  // ?_=1555063431321&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5
  // &needNewCode=1&w=12345&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8
  // &sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all
  const url = '/recommend/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    perpage: perpage,
    n: perpage,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all'
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}
