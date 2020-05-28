import axios from "axios";
import store from "../store";
export default {
  namespaced: true,
  state: {
    showModalDelete: false,
    showModal: false,
    todelete: 0,
    Playlists: [],
    loadingplaylists: 0,
    showModalAdd: false,
    trackid: 0,
    withtrack: false,
    showinput: false,
    playlist_tracks: [],
    playlist_loaded: -1,
    playlist_length: "",
    playlist_name: "",
    owner_name: "",
    playlist_image: "",
    likedplaylist: Boolean,
    restored: ""
  },
  mutations: {
    toggleModal(state, withtrack) {
      console.log(
        "while toggeling in mutations in createplaylist module the bool",
        withtrack
      );
      state.showModal = !state.showModal;
      state.withtrack = withtrack;
    },
    toggleModalDelete(state, todeleteid) {
      state.showModalDelete = !state.showModalDelete;
      state.todelete = todeleteid;
    },

    CreatePlaylist(state, playlists) {
      state.Playlists.push(playlists);
    },
    setUserPlaylist(state, playlists) {
      playlists.forEach((playlist) => {
        if (playlist.images.length == 0)
          playlist.images.push({ _id: "5eb52f1863eea332d416b9fa" });
      });
      state.Playlists = playlists;
    },
    ChangePlaylistName(state, { name, id }) {
      let obj = state.Playlists.find((f) => f.id == id);
      if (obj) obj.name = name;
    },
    PubPriChange(state, payload) {
      state.Playlists.push({
        public: payload,
      });
    },
    toggleModalAdd(state, trackid) {
      state.showModalAdd = !state.showModalAdd;
      state.trackid = trackid;
    },
    showinputfield(state,flag) {
      state.showinput = flag;
    },
    set_playlist(state, playlist_tracks) {
      state.playlist_tracks = playlist_tracks;
    },
    set_playlist_loaded(state, status) {
      state.playlist_loaded = status;
    },
    ReorderTracks(state, track) {
      state.playlist_tracks.push({
        track,
      });
    },
    AddTrackToNewPlayList(state, tracks) {
      state.playlist_tracks.push({
        tracks,
      });
    },
    set_playlist_length(state, length) {
      state.playlist_length = length;
    },
    set_playlist_name(state, name) {
      state.playlist_name = name;
    },
    set_owner_name(state, name) {
      state.owner_name = name;
    },
    set_playlist_image(state, image) {
      state.playlist_image = image;
    },
    set_likedplaylist(state, like) {
      state.likedplaylist = like;
    },
    RemoveFromThisPlaylist() {},
    AddTrackToExsistPlaylist() {},
    isRestored(state, msg) {
      state.restored = msg;
    }
  },
  actions: {
    playlist_tracks({ commit }, playlist_id) {
      commit("set_playlist_loaded", false);
      axios
        .get("/api/playlists/" + playlist_id)
        .then((response) => {
          let playlist = response.data;
          commit("set_playlist", playlist[0].tracks);
          commit("set_playlist_length", playlist[0].tracks.length);
          commit("set_playlist_name", playlist[0].name);
          commit("set_owner_name", playlist[1].ownerName);
          if (typeof playlist[0].images[0] == "undefined")
            commit("set_playlist_image", "5eb52f1863eea332d416b9fa");
          else commit("set_playlist_image", playlist[0].images[0]._id);
          commit("set_likedplaylist", playlist[0].isfollowed);
          commit("set_playlist_loaded", true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleModalAdd({ commit }, trackid) {
      console.log(" id of track in creatplaylist moudle", trackid);
      commit("toggleModalAdd", trackid);
    },
    toggleModal({ commit }, withtrack) {
      console.log(
        "while toggeling in actions in createplaylist module the bool",
        withtrack
      );
      commit("toggleModal", withtrack);
    },
    CreatePlaylist({ commit, state }, payload) {
      var user = store.getters["Authorization/user"];
      axios
        .post("/api/users/playlists", { name: payload.name })
        .then((response) => {
          const playlists = response.data;
          let x = response.data._id;
          var toAdd = {
            id: playlists._id,
            name: playlists.name,
            ownerId: playlists.ownerId,
            isPublic: playlists.isPublic,
            type: "created",
            images:[{
              _id:"1"
            }],
            owner:user.displayName
          };
          commit("CreatePlaylist", toAdd);
          console.log("in createplaylist module the bool ", state.withtrack);
          if (state.withtrack == true) {
            let d = {
              trackid: state.trackid,
              playlist_id: x,
            };
            store.dispatch("Playlist/AddTrackToNewPlayList", d);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleModalDelete({ commit }, todeleteid) {
      console.log("in actions");
      commit("toggleModalDelete", todeleteid);
    },
    //  async

    showplaylists({ commit, state }) {
      axios
        .get("/api/me/playlists")
        .then((response) => {
          let playlists = response.data;
          console.log("test function", playlists);
          commit("setUserPlaylist", playlists);
          if (state.loadingplaylists == 0) {
            state.loadingplaylists = 1;
          }
        })
        .catch((error) => {
          if (state.loadingplaylists == 0) {
            state.loadingplaylists = 1;
          }
          console.log(error);
        });
    },
    DeletePlaylist({ state, dispatch }) {
      var to_del = state.todelete.id;
      if (state.todelete.type == "created") {
        axios
          .delete("/api/me/delete/playlists/" + to_del)
          .then(() => {
            store.dispatch("Playlist/showplaylists");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        dispatch("unlike_playist",to_del);
        store.dispatch("Playlist/showplaylists");
      }
    },
    ChangePlaylistName({ commit }, payload) {
      axios
        .put("/api/playlists/" + payload.playlist_id, { name: payload.name })
        .then(() => {
          commit("ChangePlaylistName", {
            name: payload.name,
            id: payload.playlist_id,
          });
          store.dispatch("Playlist/showplaylists");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    PubPriChange({ commit }, payload) {
      console.log("in store pubpri", payload.public);
      console.log("in store id", payload.playlist_id);
      axios
        .put("/api/playlists/" + payload.playlist_id+"/public", {
          public: payload.public,
        })
        .then((response) => {
          console.log("the response", response);
          commit("PubPriChange", payload.public);
          store.dispatch("Playlist/showplaylists");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showinputfield({ commit },flag) {
      commit("showinputfield",flag);
    },
    ReorderTracks({ commit }, payload) {
      axios
        .put("/api/playlists/" + payload.playlist_id + "/tracks", {
          range_start: payload.range_start,
          insert_before: payload.insert_before,
          range_length:1
        })
        .then((response) => {
          if (status == 200) {
            let track = response.data;
            console.log("theresponse from mirage is", response.data);
            commit("ReorderTracks", track);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddTrackToNewPlayList({ commit }, payload) {
      axios
        .post("/api/playlists/" + payload.playlist_id + "/tracks", {
          tracks: payload.trackid,
        })
        .then((response) => {
          console.log(response);
          commit("AddTrackToNewPlayList");
          store.dispatch("playlist_tracks", payload.playlist_id);
          store.dispatch("Playlist/toggleModalAdd");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    like_playlist({ commit }, playlist_id) {
      axios
        .put("/api/playlists/" + playlist_id + "/followers")
        .then((response) => {
          let playlist = response.status;
          if (playlist == 200) {
            commit("set_likedplaylist", true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unlike_playist({ commit }, playlist_id) {
      axios
        .delete("/api/playlists/" + playlist_id + "/followers")
        .then((response) => {
          let playlist = response.status;
          if (playlist == 200) {
            commit("set_likedplaylist", false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    RemoveFromThisPlaylist({ commit }, payload) {
      console.log("playlistid in store", payload.playlist_id);
      console.log("trackid in store", payload.song_id);

      axios
        .delete("/api/playlists/" + payload.playlist_id + "/tracks", {
          data: { track_ids: payload.song_id },
        })
        .then((response) => {
          console.log(response);
          commit("RemoveFromThisPlaylist");
          store.dispatch("Playlist/playlist_tracks", payload.playlist_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async AddTrackToExsistPlaylist({ commit }, payload) {
      console.log("playlistid in store", payload.playlistid);
      console.log("trackid in store", payload.trackid);
      axios
        .post("/api/playlists/" + payload.playlistid + "/tracks", {
          tracks: payload.trackid,
        })
        .then((response) => {
          console.log(response);
          // store.dispatch("playlist/playlist_tracks",payload.playlistid)
          commit("AddTrackToExsistPlaylist");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    restorePlaylist({commit}, ID) {
      console.log("restore playlist in axios");
      console.log("ID: " , ID);
      axios
        .put("/api/me/restoreplaylists?playlistsIds=" + ID)
        .then((response) => {
          console.log(response.data);
          commit("isRestored", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  getters: {
    playlist_tracks: (state) => state.playlist_tracks,
    playlist_loaded: (state) => state.playlist_loaded,
    playlist_length: (state) => state.playlist_length,
    playlist_name: (state) => state.playlist_name,
    owner_name: (state) => state.owner_name,
    playlist_image: (state) => state.playlist_image,
    likeplaylist: (state) => state.likedplaylist,
    showModal: (state) => state.showModal,
    todelete: (state) => state.todelete,
    showModalDelete: (state) => state.showModalDelete,
    playlists: (state) => state.Playlists,
    loadingplaylists: (state) => state.loadingplaylists,
    showModalAdd: (state) => state.showModalAdd,
    trackid: (state) => state.trackid,
    withtrack: (state) => state.withtrack,
    showinput: (state) => state.showinput,
    restored: (state) => state.restored
  },
};
