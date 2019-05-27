import Axios from 'axios'
import { commonParams } from './config'

export function getRecommend() {
  // https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
  // ?_=1554174388340&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1
  const url = '/recommend/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
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

export function getDiscList() {
  // https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg
  // ?picmid=1&rnd=0.5455281197651229&g_tk=5381&loginUin=0&hostUin=0&format=json
  // &inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0
  // &categoryId=10000000&sortId=5&sin=0&ein=19
  const url = '/recommend/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    picmid: 1,
    ein: 19,
    sin: 0,
    sortId: 5,
    categoryId: 10000000,
    needNewCode: 0
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

export function getDiscDetail(dissid) {
  const url = '/disc/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: dissid,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}
