<template>
  <music-list :rank="true" :songs="songs" :title="title" :bgImage="bgImage"></music-list>
</template>

<script>
  import MusicList from 'components/music-list/MusicList'
  import { mapGetters } from 'vuex'
  import { getSongList } from 'api/rank'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'

  export default {
    name: 'RankDetail',
    components: {
      MusicList
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.rank.topTitle
      },
      bgImage() {
        return this.rank.picUrl
      },
      ...mapGetters([
        'rank'
      ])
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.rank.id) {
          this.$router.push('/rank')
        }
        getSongList(this.rank.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let { data } = item
          if (data.songid && data.albummid) {
            ret.push(createSong(data))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped>
</style>
