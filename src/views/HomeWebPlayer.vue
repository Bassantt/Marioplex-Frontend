<template>
  <div class="home_webplayer" @contextmenu.prevent="handler" @click="closeMenu">
    <side-bar />
    <CreatePlaylist v-if="show" />
    <mediaplayerpopup v-if="showmediaplayerpopup" />
    <DeletePlaylist v-if="showdelete" />
    <PremiumAd v-if="premiumPopup" />
    <div class="HomeInWebPlayer" id="mainBody" @scroll="handler">
      <router-view class="child" :key="componentKey"></router-view>
      <navbar-webplayer />
      <!-- <library-navbar/> -->
    </div>
    <mediaplayer />
    <playlistpopup v-if="showuserpopup" />
    <AddTrackPopup v-if="showAdd"></AddTrackPopup>
  </div>
</template>
<style scoped>
.HomeInWebPlayer {
  width: calc(100vw - 235px);
  height: calc(100vh - 90px);
  margin-left: 235px;
  padding-bottom: 90px;
  background-color: #161516;
  position: fixed;
  top: 0%;
  z-index: 0;
  overflow: auto;
}
.child {
  padding-top: 80px;
}
@media screen and (max-width: 1000px) {
  .HomeInWebPlayer {
    width: calc(100vw - 60px);
    margin-left: 60px;
  }
}
</style>
<script>
import SideBar from "@/components/SideBar.vue";
import CreatePlaylist from "@/components/CreatePlaylist.vue";
import mediaplayerpopup from "@/components/MediaplayerPopup.vue";
import playlistpopup from "@/components/PlaylistPopup.vue";
import mediaplayer from "@/components/Mediaplayer.vue";
import DeletePlaylist from "@/components/DeletePlaylist.vue";
import NavbarWebplayer from "@/components/NavbarWebplayer.vue";
import PremiumAd from "@/components/PremiumAd.vue";
import AddTrackPopup from "../components/AddTrackPopup";
import { mapState, mapGetters } from "vuex";
//import LibraryNavbar from "@/components/library-navbar.vue";
/**
 * Web player home page where all albums and playlists exist
 * @displayName Web Player Home page
 * @example [none]
 */
export default {
  name: "HomeWebPlayer",
  data: function() {
    return {
      componentKey: 0
    };
  },
  components: {
    SideBar,
    CreatePlaylist,
    mediaplayer,
    DeletePlaylist,
    mediaplayerpopup,
    playlistpopup,
    PremiumAd,
    // LibraryNavbar
    NavbarWebplayer,
    AddTrackPopup
  },
  computed: {
    ...mapState({
      show: state => state.Playlist.showModal,
      showmediaplayerpopup: state => state.CheckUserPopup.showModal,
      showuserpopup: state => state.CheckUserPopup.showpagesModal,
      showdelete: state => state.Playlist.showModalDelete,
      showAdd: state => state.Playlist.showModalAdd
    }),
    ...mapGetters({
      premiumPopup: "Mediaplayer/premiumPopup"
    })
  },
  methods: {
    handler() {
      var element = document.getElementById("mainBody");
      this.$store.dispatch("UserLibrary/scrolling", element.scrollTop);
    },
    closeMenu() {
      this.$store.dispatch("UserLibrary/sideMenu", false);
    }
  },
  watch: {
    $route() {
      this.componentKey = (this.componentKey + 1) % 4;
    }
  }
};
</script>
