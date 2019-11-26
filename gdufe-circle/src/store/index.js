import Vue from 'vue'
import Vuex from 'vuex'
import cookie from '../cookies';
import axios from '../axios';
import { types } from 'util';

Vue.use(Vuex)

const state = {
	username: cookie.getCookie('username') && new Buffer(cookie.getCookie('username'), 'base64').toString() || '',
	userId: cookie.getCookie('userid') || '',
}

const mutations = {
	LOGIN: (state, data) => {
		state.username = data.username;
		state.userId = data.userid;
	},
	LOGOUT: (state) => {
	},
	USERNAME: (state, data) => {
	}
};

const actions = {
	UserLogin ({ commit }, form) {
		return new Promise((resolve, rejects) => {
			axios.userLogin(form)
				.then(({ data }) => {
					if(data.code == 200) {
						commit('LOGIN', data);
						resolve();
					} else if(data.code == 201) {
						this.$message.error(data.message);
						reject();
					}
				})
		})
	},
	UserLogout({ commit }){
		commit('LOGOUT');
	},
	UserName({ commit }, data){
		commit('USERNAME', data);
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions
});