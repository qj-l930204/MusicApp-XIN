<template>
  <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
</template>

<script>
  import MusicList from 'components/music-list/MusicList'
  import { getDiscDetail } from 'api/recommend'
  import { createSong } from 'common/js/song'
  import { mapGetters } from 'vuex'
  import { ERR_OK } from 'api/config'

  export default {
    name: 'Disc',
    components: {
      MusicList
    },
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDiscDetail()
    },
    methods: {
      _getDiscDetail() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getDiscDetail(this.disc.dissid)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let musicData = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
