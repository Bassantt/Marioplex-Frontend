import axios from "axios";
var i = 0;
export default {
  namespaced: true,
  state: {
    currentsong: {},
    songs: [],
    liked: false,
    playicon: false,
    currentaudio: null,
    progress: 0,
    trackduration: 0
  },
  mutations: {
    setplayicon(state, playicon) {
      state.playicon = playicon;
    },
    setliked(state, like) {
      state.liked = like;
    },
    setalbumimage(state, albumimage) {
      state.songs.album_image = albumimage;
    },
    setsongname(state, songname) {
      state.songs.song_name = songname;
    },
    setartistsname(state, artistsname) {
      state.songs.artist_name = artistsname;
    },
    // setplaysong(state, playsong) {
    //   state.playsong = playsong;
    // },
    setplaysong(state, playsong) {
      state.songs.song = playsong;
    },
    setpausesong(state) {
      if (state.currentaudio) state.currentaudio.pause();
    },
    setprevsong(state, prevsong) {
      state.songs.song = prevsong;
    },
    setnextsong(state, nextsong) {
      state.songs.song = nextsong;
    },
    setstarttime(state, starttime) {
      state.songs.start_time = starttime;
    },
    setendtime(state, endtime) {
      state.songs.end_time = endtime;
    },
    setreapetsong(state, repeatsong) {
      state.repeatsong = repeatsong;
    },
    setshufflesongs(state, shufflesongs) {
      state.shufflesongs = shufflesongs;
    },
    set_currentsong(state, currentsong) {
      state.currentsong = currentsong;
    },
    toggleicon(state) {
      state.playicon = !state.playicon;
    },
    startcurrentaudio(state, playsong) {
      if (state.currentaudio) {
        state.currentaudio.play();
      } else {
        state.currentaudio = new Audio(playsong);
        state.currentaudio.play();
      }
    }
  },
  actions: {
    playicon_state({ commit }, status) {
      commit("setplayicon", status);
    },

    currentsong_info({ commit }) {
      axios
        .get("/api/player/currently-playing")
        .then(response => {
          let albumimage = response.data;
          let songname = response.data;
          let artistsname = response.data;
          let starttime = response.data;
          let endtime = response.data;
          commit("setalbumimage", albumimage[0].album_image);
          commit("setsongname", songname[0].song_name);
          commit("setartistsname", artistsname[0].artist_name);
          commit("setstarttime", starttime[0].start_time);
          commit("setendtime", endtime[0].end_time);
        })
        .catch(error => {
          console.log(error);
        });
    },
    playsong_state({ commit }) {
      axios
        .get("/api/player/play")
        .then(response => {
          let playsong = response.data;
          console.log("playsong", Object.keys(playsong).length);
          console.log("inside axios", playsong[i].song);
          commit("startcurrentaudio", playsong[i].song);

          // commit("setplaysong", playsong[i].song);
        })
        .catch(error => {
          console.log(error);
        });
    },

    pausesong_state({ commit }) {
      axios
        .get("/api/player/pause")
        .then(response => {
          let pausesong = response.data;
          commit("setpausesong", pausesong[i].song);
        })
        .catch(error => {
          console.log(error);
        });
    },
    nextsong_state({ commit }) {
      axios
        .get("/api/player/next")
        .then(response => {
          let nextsong = response.data;
          i += 1;
          console.log(i);
          console.log(Object.keys(nextsong).length);
          if (i == Object.keys(nextsong).length) {
            i = 0;
            commit("setnextsong", nextsong[i].song);
          } else commit("setnextsong", nextsong[i].song);
        })
        .catch(error => {
          console.log(error);
        });
    },
    prevsong_state({ commit }) {
      axios
        .get("/api/player/previous")
        .then(response => {
          let prevsong = response.data;
          i -= 1;
          if (i < 0) i = 0;
          else commit("setprevsong", prevsong[i].song);
        })
        .catch(error => {
          console.log(error);
        });
    },
    repeatsong_state({ commit }) {
      axios
        .get("/api/player/repeat")
        .then(response => {
          let repeatsong = response.data.song;
          commit("setreapetsong", repeatsong);
        })
        .catch(error => {
          console.log(error);
        });
    },
    shufflesong_state({ commit }) {
      axios
        .get("/api/player/shuffle")
        .then(response => {
          let shfflesongs = response.data.song;
          commit("setshufflesongs", shfflesongs);
        })
        .catch(error => {
          console.log(error);
        });
    },
    toggleicon({ commit }) {
      commit("toggleicon");
    },
    ////////////here i should send end point of like with id
    likesong({ commit }) {
      commit("setliked", true);
    },
    ///////////here i should send end point of unlike with id
    unlikesong({ commit }) {
      commit("setliked", false);
    },
    stateofsong({ commit }) {
      axios
        .get("/api/me/like")
        .then(response => {
          let like = response.data;
          commit("setliked", like[i].liked);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_currentsong({ commit }) {
      axios
        .get("/api/currentsong")
        .then(response => {
          var currentsong = response.data.currentsong;
          commit("set_currentsong", currentsong);
        })
        .catch(error => {
          console.error(error);
        });
    },
    advance_progress({ state }) {
      if (state.currentaudio) {
        if (!state.currentaudio.ispaused) {
          state.trackduration = state.currentaudio.duration;
          state.progress = state.currentaudio.currentTime;
        }
      }
    },
    update_progress({ state }, pos) {
      if (state.currentaudio) {
        state.currentaudio.currentTime = pos;
        state.progress = pos;
      }
    }
  },
  getters: {
    //     albumimage: state => state.albumimage,
    //     songname: state => state.songname,
    //     artistsname: state => state.artistsname,
    //     starttime: state => state.starttime,
    //     endtime: state => state.endtime,
    //     playsong: state => state.playsong
    Get_Currentsong: state => state.currentsong[0],
    playicon: state => {
      return state.playicon;
    },
    liked: state => {
      return state.liked;
    },
    // currentaudio:state => state.currentaudio,
    currentaudio: state => {
      return state.currentaudio;
    },
    progress: state => {
      return state.progress;
    },
    duration: state => {
      return state.trackduration;
    }
  }
};
