import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session:    null,
    office_id:  null,
    name:       null,
    lastName:   null,
    affiliated: null,
    activated:  null,
    _activated: null,
    plan:       null,
    country:    null,
    photo:      null,
    tree:       null,

    fb:   'https://web.facebook.com/profile.php?id=100094158219946',
    is:   'https://www.instagram.com/cbmecuadoroficial/',
    tk:   'https://www.tiktok.com/@cbmundialoficial?_t=ZM-8y72C6T6M7S&_r=1',
    yt:   'https://youtube.com/@companiabrillantemundial?si=pd2gwboCXaa0Ma6E',
    wsp_pe: '',
    wsp_bo: '',
    wsp_ec: 'https://wa.link/7yiaav',
    site: '',

    open: false,
    resume: false,
    buys: false,
    network: false,
    commissions: false,
  },
  mutations: {
    SET_SESSION: (state, session) => {
      console.log('SET_SESSION', { session })
      if(session) localStorage.setItem('session', session)
      state.session = session
    },
    SET_OFFICE_ID: (state, {office_id, path}) => {
      console.log('SET_OFFICE_ID', { office_id, path })
      if(office_id) localStorage.setItem('office'   , true     )
      if(office_id) localStorage.setItem('office_id', office_id)
      if(office_id) localStorage.setItem('path'     , path     )
      state.office_id = office_id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_LAST_NAME: (state, lastName) => {
      state.lastName = lastName
    },
    SET_AFFILIATED: (state, affiliated) => {
      state.affiliated = affiliated
    },
    SET_ACTIVATED: (state, activated) => {
      state.activated = activated
    },
    SET__ACTIVATED: (state, _activated) => {
      state._activated = _activated
    },
    SET_PLAN: (state, plan) => {
      state.plan = plan
    },
    SET_COUNTRY: (state, country) => {
      state.country = country
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_TREE: (state, tree) => {
      state.tree = tree
    },

    SET_OPEN: (state) => {
      state.open = !state.open
    },
    SET_RESUME: (state) => {
      state.resume = !state.resume
      state.buys = false
      state.network = false
      state.commissions = false
    },
    SET_BUYS: (state) => {
      state.resume = false
      state.buys = !state.buys
      state.network = false
      state.commissions = false
    },
    SET_NETWORK: (state) => {
      state.resume = false
      state.buys = false
      state.network = !state.network
      state.commissions = false

    },
    SET_COMMISSIONS: (state) => {
      state.resume = false
      state.buys = false
      state.network = false
      state.commissions = !state.commissions
    },
  },
})
