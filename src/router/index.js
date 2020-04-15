import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import HomeWebPlayer from "../views/HomeWebPlayer.vue";
import UserHome from "../views/UserHome.vue";
import Search from "../views/Search.vue";
import LikedTracks from "../views/LikedTracks.vue";
import Library from "../views/Library.vue";
import LibraryPlaylists from "../views/library-playlists.vue";
import LibraryArtists from "../views/library-artists.vue";
import LibraryAlbums from "../views/library-albums.vue";
import Queue from "../views/Queue.vue";
import ForArtist from "../views/ForArtist.vue";
import AccessArtist from "../views/AccessArtist";
import ClaimArtist from "../views/ClaimArtist";
import ArtistPersonalPage from "../views/ArtistPersonalPage";
import playlist from "../views/playlist_view.vue";
import GetPremium from "../views/GetPremium.vue";
import UserAccount from "../views/UserAccount.vue";
import ArtistProfile from "../views/ArtistProfile.vue";
import album from "../views/album_view.vue";
import seeallartist from "../views/seeallartist.vue";
import AllLists from "../views/AllLists.vue";
import AllArtists from "../views/AllArtists.vue";
import AllAlbums from "../views/AllAlbums.vue";
import AllReleases from "../views/AllReleases.vue";
import HomeBody from "../components/HomeBody.vue";
import AccountOverview from "../components/Account-overview.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        component: HomeBody
      },
      {
        path: "UserAccount",
        component: UserAccount,
        children:[
          {
            path: "Account-overview",
            component: AccountOverview
          }

        ]
      }
    ]
  },
  {
    path: "/HomeWebPlayer",
    name: "HomeWebPlayer",
    component: HomeWebPlayer,
    children: [
      { path: "", component: UserHome },

      {
        path: "search",
        component: Search,
        children: [
          {
            path: "seeallartist",
            component: seeallartist
          }
        ]
      },
      {
        path: "library",
        component: Library,
        children: [
          {
            path: "library-playlists",
            component: LibraryPlaylists
          },
          {
            path: "library-artists",
            component: LibraryArtists
          },
          {
            path: "library-albums",
            component: LibraryAlbums
          }
        ]
      },
      { path: "liked-tracks", component: LikedTracks },
      { path: "queue", component: Queue },
      {
        path: "playlist/:playlist_id",
        name: "playlist",
        component: playlist
      },
      {
        path: "album/:album_id",
        name: "album",
        component: album
      },
      {
        path: "/ArtistProfile",
        name: "ArtistProfile",
        component: ArtistProfile
      },
      {
        path: "/AllLists",
        name: "AllLists",
        component: AllLists
      },
      {
        path: "/AllArtists",
        name: "AllArtists",
        component: AllArtists
      },
      {
        path: "/AllAlbums",
        name: "AllAlbums",
        component: AllAlbums
      },
      {
        path: "/AllReleases",
        name: "AllReleases",
        component: AllReleases
      }
    ]
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/ForgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword
  },
  {
    path: "/ForArtist",
    name: "ForArtist",
    component: ForArtist
  },
  {
    path: "/ClaimArtist",
    name: "ClaimArtist",
    component: ClaimArtist
  },
  {
    path: "/AccessArtist",
    name: "AccessArtist",
    component: AccessArtist
  },
  {
    path: "/ArtistPersonalPage",
    name: "ArtistPersonalPage",
    component: ArtistPersonalPage
  },
  {
    path: "/GetPremium",
    name: "GetPremium",
    component: GetPremium
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
