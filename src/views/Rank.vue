<template>
  <div class="rank" ref="rank">
    <scroll :data="ranklist" class="toplist" ref="toplist">
      <ul>
        <li class="item" v-for="(rank, index) in ranklist" :key="index" @click="selectItem(rank)">
          <div class="icon">
            <img width="100" height="100" v-lazy="rank.picUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, ind) in rank.songList" :key="ind">
              <span>{{ ind + 1 }}</span>
              <span>{{ song.songname }}-{{ song.singername }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!ranklist.length">
        <loading></loading>
      </div>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Scroll from 'components/scroll/Scroll'
  import Loading from 'components/loading/Loading'
  import { getRankList } from 'api/rank'
  import { playlistMixin } from 'common/js/mixin'
  import { ERR_OK } from 'api/config'
  import { mapMutations } from 'vuex'

  export default {
    name: 'Rank',
    mixins: [ playlistMixin ],
    components: {
      Scroll,
      Loading
    },
    data() {
      return {
        ranklist: []
      }
    },
    created() {
      this._getRankList()
    },
    methods: {
      selectItem(rank) {
        this.$router.push({
          path: `/rank/${rank.id}`
        })
        this.setRank(rank)
      },
      _getRankList() {
        getRankList().then(res => {
          if (res.code === ERR_OK) {
            this.ranklist = res.data.topList
          }
        })
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      ...mapMutations({
        setRank: 'SET_RANK'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
    .slide-enter-active, .slide-leave-active
      transition: all .3s

    .slide-enter, .slide-leave-to
      transform translate3d(100%, 0, 0)
</style>
