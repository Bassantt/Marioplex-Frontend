<template>
  <div>
    <div class="emptyplaylist">
      <div class="defaultimage">
        <svg
          id="musicicon"
          width="90"
          height="89"
          viewBox="0 0 80 81"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Playlist Icon</title>
          <path
            d="M25.6 11.565v45.38c-2.643-3.27-6.68-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4 14.4-6.46 14.4-14.4v-51.82l48-10.205V47.2c-2.642-3.27-6.678-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4S80 64.17 80 56.23V0L25.6 11.565zm-11.2 65.61c-6.176 0-11.2-5.025-11.2-11.2 0-6.177 5.024-11.2 11.2-11.2 6.176 0 11.2 5.023 11.2 11.2 0 6.174-5.026 11.2-11.2 11.2zm51.2-9.745c-6.176 0-11.2-5.024-11.2-11.2 0-6.174 5.024-11.2 11.2-11.2 6.176 0 11.2 5.026 11.2 11.2 0 6.178-5.026 11.2-11.2 11.2z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div>
        <h2
          v-if="playlist_name == null"
          class="playlistname"
          testid="defaultplaylistname"
        >
          New Playlist
        </h2>
        <h2
          v-if="playlist_name != null"
          class="playlistname"
          testid="playlistname"
        >
          {{ playlist_name }}
        </h2>
        <router-link to="/" id="owner_name" testid="ownername">{{
          owner_name
        }}</router-link>
      </div>

      <button class="playbutton" testid="playbutton">PLAY</button>
      <div class="morechoices">
        <span data-toggle="tooltip" title="More">
          <!-- <i id="list_icon" class="fa fa-ellipsis-h dots_icon" @click="toggleShow()"></i> -->
          <p id="list_icon" testid="listicon" @click="toggleShow()">...</p>
        </span>
        <div id="mydropdown" testid="dropdownlist" class="db" v-show="show">
          <p>Make Secret</p>
          <p>Delete</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.emptyplaylist {
  margin: 50px;
  position: absolute;
  text-align: center;
}
.defaultimage {
  height: 320px;
  width: 320px;
  align-content: center;
  background-color: #302f2f;
  text-align: center;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  #musicicon {
    top: 110px;
    color: #c2c1c1;
    position: absolute;
  }
}
.playlistname {
  color: white;
  margin: 20px;
  margin-bottom: 5px;
  font-weight: bold;
}
#owner_name {
  color: #b3b3b3;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.015em;
}
#owner_name:hover {
  color: white;
}
button {
  background-color: transparent;
  border: none;
  padding: 10px;
}
.playbutton {
  opacity: 0.3;
  background-color: #1ed760;
  border-radius: 500px;
  width: 120px;
  height: 35px;
  padding: 8px 34px;
  display: inline-block;
  color: white;
  margin: 25px 25px 0px 25px;
  align-content: center;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 1.76px;
}
button:focus {
  outline: 0 !important;
}
#list_icon {
  margin: 2px;
  color: white;
  font-size: 25px;
  letter-spacing: 1.76px;
  font-weight: bold;
}
// p{
// color: #b3b3b3;
// font-size: 12px;
// letter-spacing: 1.76px;
// font-weight: bold;
// font-size: 12px;
// }
.db {
  position: absolute;
  background-color: #282828;
  width: 203px;
  z-index: 1;
  border-radius: 0.25rem;
  right: 20px;
  p {
    color: #b3b3b3;
    margin: 0%;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1.76px;
    height: 38px;
  }
  p:hover {
    background-color: #313030;
    color: #fff;
    cursor: pointer;
  }
}
.left {
  display: inline;
  position: absolute;
  width: 40%;
  left: 0;
}

@media screen and (max-width: 1000px) {
  .left {
    display: block;
    width: 100%;
    position: relative;
  }
}
</style>
<script>
import { mapGetters } from "vuex";
/**
 * Playlist view
 * @displayName Playlist view
 * @example [none]
 */
export default {
  data: function() {
    return {
      show: false
    };
  },
  name: "playlist",
  methods: {
    /**
     * shows the list options(not implemented)
     * @public This is a public method
     */
    toggleShow() {
      var x = this.show;
      window.Element.show = false;
      this.show = !x;
    }
  },
  computed: {
    ...mapGetters({
      playlist_name: "Playlist/playlist_name",
      owner_name: "Playlist/owner_name"
    })
  }
};
</script>
