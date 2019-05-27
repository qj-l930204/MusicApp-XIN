import { commonParams } from './config'
import Axios from 'axios'

  // https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg
  // ?nobase64=1
  // &musicid=228859369
  // &-=jsonp1
  // &g_tk=5381
  // &loginUin=0
  // &hostUin=0
  // &format=json
  // &inCharset=utf8
  // &outCharset=utf-8
  // &notice=0
  // &platform=yqq.json
  // &needNewCode=0

export function getLyric(mid) {
  const url = '/recommend/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}
