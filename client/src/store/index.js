import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      loading: true,
      userData: {},
      userActivities: [],


      center: [],
      mouseHoverActivity: {
        id: null,
        isHovering: false,
        center: []
      },
      mouseClickActivity: {
        id: null,
        isClicked: false,
        center: []
      }
  },
  mutations: {
      updateUserData(state, payload){
        state.userData = payload
      },
      updateUserActivities(state, payload){
        state.userActivities = payload
        state.center = payload[0].start_latlng
      },
      updateLoading(state){
        state.loading = !state.loading
      },

      updateHover(state, payload){
        state.mouseHoverActivity.id = payload.id,
        state.mouseHoverActivity.isHovering = payload.isHovering,
        state.mouseHoverActivity.center = payload.center
      },
      updateClick(state, payload){
        state.mouseClickActivity.id = payload.id,
        state.mouseClickActivity.isClicked = payload.isClicked,
        state.mouseClickActivity.center = payload.center
      }
      
  },
  getters: {
    getAllPolylines: state => { //Data for Map all
      return state.userActivities.map(element => [element.map.summary_polyline, element.id, element.start_latlng])
    },
    getActivites: state => {  //Data for Activities
      return state.userActivities
    },
    getHoverActivity: state => { //Data for map hover event
      return state.userActivities.find(activity => activity.id == state.mouseHoverActivity.id).map.summary_polyline
    },
    getClickActivity: state => { //Data for map click event
      return state.userActivities.find(activity => activity.id == state.mouseClickActivity.id).map.summary_polyline
    },
    getCenter: state => { //Get center for map
      if(state.mouseHoverActivity.isHovering){
        return state.mouseHoverActivity.center
      }
      else if(state.mouseClickActivity.isClicked){
        return state.mouseClickActivity.center
      }
      else
        return state.center
    }
  }
})
