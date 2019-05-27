<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="desclist">
      <div>
        <div v-if="sliders.length" class="slider-wrapper">
          <slider>
            <div v-for="(slider, index) in sliders" :key="index">
              <a :href="slider.linkUrl">
                <img @load="loadImage" :src="slider.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门新歌推荐</h1>
          <ul>
            <li v-for="(desc, index) in desclist" :key="index" class="item" @click="selectItem(desc)">
              <div class="icon">
                <img v-lazy="desc.imgurl" width="60" height="60" alt="">
              </div>
              <div class="text">
                <h3 class="name" v-html="desc.creator.name"></h3>
                <p class="desc" v-html="desc.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-contarner" v-show="!desclist.length">
        <loading></loading>
      </div>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Scroll from 'components/scroll/Scroll'
  import Slider from 'components/slider/Slider'
  import Loading from 'components/loading/Loading'
  import { getRecommend, getDiscList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import { playlistMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'

  export default {
    name: 'Recommend',
    mixins: [ playlistMixin ],
    components: {
      Slider,
      Scroll,
      Loading
    },
    data() {
      return {
        sliders: [],
        desclist: []
      }
    },
    created() {
      this._getRecommend()
      setTimeout(() => {
        this._getDiscList()
      }, 1000)
    },
    methods: {
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _initScroll() {
        this.recommend = new BScroll(this.$refs.recommend, {
          click: true
        })
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.sliders = res.data.slider
            // console.log(this.sliders)
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.desclist = res.data.list
            // console.log(this.desclist)
          }
        })
      },
      loadImage() {
        if (!this.checkLoad) {
          this.checkLoad = true
          this.$refs.scroll.refresh()
        }
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        overflow hidden
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
          .text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            font-size $font-size-medium
            .name
              margin-bottom 10px
              color $color-text
            .desc
              color $color-text-d
      .loading-contarner
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
    .slide-enter-active, .slide-leave-active
      transition: all .3s

    .slide-enter, .slide-leave-to
      transform translate3d(100%, 0, 0)
</style>
