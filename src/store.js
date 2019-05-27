import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, loadSearch, deleteSearch, clearSearch, savePlay, loadPlay } from 'common/js/cache'

Vue.use(Vuex)

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

const debug = process.env.NODE_ENV !== 'production'

const SET_SINGER = 'SET_SINGER'
const SET_PLAYING_STATE = 'SET_PLAYING_STATE'
const SET_FULL_SCREEN = 'SET_FULL_SCREEN'
const SET_PLAYLIST = 'SET_PLAYLIST'
const SET_SEQUENCE_LIST = 'SET_SEQUENCE_LIST'
const SET_PLAY_MODE = 'SET_PLAY_MODE'
const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX'
const SET_DISC = 'SET_DISC'
const SET_RANK = 'SET_RANK'
const SET_SEARCH_HISTORY = 'SET_SEARCH_HISTORY'
const SET_PLAY_HISTORY = 'SET_PLAY_HISTORY'

export default new Vuex.Store({
  state: {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    rank: {},
    searchHistory: loadSearch(),
    playHistory: loadPlay()
  },
  mutations: {
    [SET_SINGER](state, singer) {
      state.singer = singer
    },
    [SET_PLAYING_STATE](state, flag) {
      state.playing = flag
    },
    [SET_FULL_SCREEN](state, flag) {
      state.fullScreen = flag
    },
    [SET_PLAYLIST](state, list) {
      state.playlist = list
    },
    [SET_SEQUENCE_LIST](state, list) {
      state.sequenceList = list
    },
    [SET_PLAY_MODE](state, mode) {
      state.mode = mode
    },
    [SET_CURRENT_INDEX](state, index) {
      state.currentIndex = index
    },
    [SET_DISC](state, list) {
      state.disc = list
    },
    [SET_RANK](state, list) {
      state.rank = list
    },
    [SET_SEARCH_HISTORY](state, list) {
      state.searchHistory = list
    },
    [SET_PLAY_HISTORY](state, list) {
      state.playHistory = list
    }
  },
  actions: {
    selectPlay({ commit, state }, { list, index }) {
      commit(SET_SEQUENCE_LIST, list)
      if (state.mode === playMode.random) {
        let randomlist = shuffle(list)
        commit(SET_PLAYLIST, randomlist)
        index = findIndex(randomlist, list[index])
      } else {
        commit(SET_PLAYLIST, list)
      }
      commit(SET_CURRENT_INDEX, index)
      commit(SET_FULL_SCREEN, true)
      commit(SET_PLAYING_STATE, true)
    },
    randomPlay({ commit }, { list }) {
      commit(SET_PLAY_MODE, playMode.random)
      commit(SET_SEQUENCE_LIST, list)
      let randomlist = shuffle(list)
      commit(SET_PLAYLIST, randomlist)
      commit(SET_CURRENT_INDEX, 0)
      commit(SET_FULL_SCREEN, true)
      commit(SET_PLAYING_STATE, true)
    },
    insertSong({ commit, state }, song) {
      let playlist = state.playlist.slice()
      let sequenceList = state.sequenceList.slice()
      let currentIndex = state.currentIndex
      // 记录当前歌曲
      let currentSong = playlist[currentIndex]
      // 查找当前列表是否存在要插入的歌曲
      let fpIndex = findIndex(playlist, song)
      // 插入歌曲，索引+1
      currentIndex++
      playlist.splice(currentIndex, 0, song)
      //  如果已经包含这首歌
      if (fpIndex > -1) {
        // 如果当前插入的序号大于原来的序号
        if (currentIndex > fpIndex) {
          playlist.splice(fpIndex, 1)
          currentIndex--
        } else {
          playlist.splice(fpIndex + 1, 1)
        }
      }

      let currentSIndex = findIndex(sequenceList, currentSong) + 1
      let fsIndex = findIndex(sequenceList, song)
      sequenceList.splice(currentSIndex, 0, song)
      if (fsIndex > -1) {
        if (currentIndex > fsIndex) {
          sequenceList.splice(fsIndex, 1)
        } else {
          sequenceList.splice(fsIndex + 1, 1)
        }
      }

      commit(SET_PLAYLIST, playlist)
      commit(SET_SEQUENCE_LIST, sequenceList)
      commit(SET_CURRENT_INDEX, currentIndex)
      commit(SET_FULL_SCREEN, true)
      commit(SET_PLAYING_STATE, true)
    },
    saveSearchHistory({ commit }, query) {
      commit(SET_SEARCH_HISTORY, saveSearch(query))
    },
    deleteSearchHistory({ commit }, query) {
      commit(SET_SEARCH_HISTORY, deleteSearch(query))
    },
    clearSearchHistory({ commit }) {
      commit(SET_SEARCH_HISTORY, clearSearch())
    },
    deleteSong({ commit, state }, song) {
      let playlist = state.playlist.slice()
      let sequenceList = state.sequenceList.slice()
      let currentIndex = state.currentIndex
      let pIndex = findIndex(playlist, song)
      playlist.splice(pIndex, 1)
      let sIndex = findIndex(sequenceList, song)
      sequenceList.splice(sIndex, 1)
      if (currentIndex > pIndex || currentIndex === playlist.length) {
        currentIndex--
      }
      commit(SET_PLAYLIST, playlist)
      commit(SET_SEQUENCE_LIST, sequenceList)
      commit(SET_CURRENT_INDEX, currentIndex)
      if (!playlist.length) {
        commit(SET_PLAYING_STATE, false)
      } else {
        commit(SET_PLAYING_STATE, true)
      }
    },
    clearSong({ commit }) {
      commit(SET_PLAYLIST, [])
      commit(SET_SEQUENCE_LIST, [])
      commit(SET_CURRENT_INDEX, -1)
      commit(SET_PLAYING_STATE, false)
    },
    savePlayHistory({ commit }, song) {
      commit(SET_PLAY_HISTORY, savePlay(song))
    }
  },
  getters: {
    singer: state => state.singer,
    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playlist: state => state.playlist,
    sequenceList: state => state.sequenceList,
    mode: state => state.mode,
    currentIndex: state => state.currentIndex,
    currentSong: (state) => {
      return state.playlist[state.currentIndex] || {}
    },
    disc: state => state.disc,
    rank: state => state.rank,
    searchHistory: state => state.searchHistory,
    playHistory: state => state.playHistory
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
