import Axios from 'axios'
import { commonParams } from './config'

export function getSingerList () {
  const url = '/singer/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 2001751543
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

export function getSingerDetail(singerId) {
  const url = '/singer/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    ct: 24,
    order: 'listen',
    begin: 0,
    num: 100
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

export function getVKey(songmid) {
  const url = '/vkey/cgi-bin/musicu.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"6635269819","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"6635269819","songmid":["${songmid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
  })

  return Axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data.req.data.vkey)
  }).catch((e) => {
    console.log(e)
  })
}
