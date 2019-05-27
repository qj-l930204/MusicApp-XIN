import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid)
        .then((res) => {
          if (res.retcode === ERR_OK) {
            this.lyric = Base64.decode(res.lyric)
            resolve(this.lyric)
          } else {
            // reject('no lyric')
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid || musicData.songId,
    mid: musicData.songmid || musicData.albumMid,
    singer: filterSinger(musicData.singer) || musicData.singerName,
    name: musicData.songname || musicData.title,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000` || `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albumMid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=6635269819&uin=0&fromtag=38` || `http://dl.stream.qqmusic.qq.com/C400${musicData.songId}.m4a?guid=6635269819&uin=0&fromtag=38`
  })
}

export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
