<template>
  <div class="search" ref="search">
    <div class="search-box-wrapper">
      <search-box @query="onQueryChange" ref="searchBox"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutwrapper">
      <scroll class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h3 class="title">热门搜索</h3>
            <ul>
              <li @click="addQuery(hotkey.k)" v-for="(hotkey, index) in hotkeys" :key="index" class="item">
                <span>{{ hotkey.k }}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h3 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="clearSearch">
              <i class="icon-clear"></i>
            </span>
            </h3>
            <search-list
                    @select="addQuery"
                    @delete="deleteSearch"
                    :searches="searchHistory"
            >
            </search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest ref="suggest" :query="query" @select="saveSearch" @listScroll="blurInput"></suggest>
    </div>
    <confirm text="是否清空搜索历史"
             ref="confirm"
             @cancel="cancel"
             @confirm="confirm"
    >
    </confirm>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import SearchBox from 'components/search-box/SearchBox'
  import Suggest from 'components/suggest/Suggest'
  import { getHotKey } from 'api/search'
  import { ERR_OK } from 'api/config'
  import { mapActions } from 'vuex'
  import SearchList from 'components/search-list/SearchList'
  import Confirm from 'components/confirm/Confirm'
  import Scroll from 'components/scroll/Scroll'
  import { playlistMixin, searchMixin } from 'common/js/mixin'

  export default {
    name: 'Search',
    mixins: [
      playlistMixin,
      searchMixin
    ],
    components: {
      Scroll,
      Confirm,
      SearchList,
      SearchBox,
      Suggest
    },
    computed: {
      shortcut() {
        return this.hotkeys.concat(this.searchHistory)
      }
    },
    data() {
      return {
        hotkeys: []
      }
    },
    created() {
      this._getHotKey()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.shortcutwrapper.style.bottom = bottom
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.shortcut.refresh()
        this.$refs.suggest.refresh()
      },
      deleteSearch(item) {
        this.deleteSearchHistory(item)
      },
      clearSearch() {
        this.$refs.confirm.show()
      },
      cancel() {
      },
      confirm() {
        this.clearSearchHistory()
      },
      _getHotKey() {
        getHotKey().then(res => {
          if (res.code === ERR_OK) {
            this.hotkeys = res.data.hotkey.slice(0, 10)
          }
        })
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
    .slide-enter-active, .slide-leave-active
      transition: all .3s

    .slide-enter, .slide-leave-to
      transform translate3d(100%, 0, 0)
</style>
