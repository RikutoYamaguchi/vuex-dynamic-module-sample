import Vue from 'vue';

const userStab = {
  user_1: {
    uid: 1,
    name: 'Taro',
    tel: '000-0000-0000',
    email: 'sample@test.com'
  },
  user_2: {
    uid: 2,
    name: 'Jiro',
    tel: '000-0000-0000',
    email: 'sample@test.com'
  },
  user_3: {
    uid: 3,
    name: 'Saburo',
    tel: '000-0000-0000',
    email: 'sample@test.com'
  }
};

const state = {
  all: userStab
};

// mutation types
const UPDATE_USER = 'update_user';
const CREATE_USER = 'create_user';

const mutations = {
  /**
   * ユーザーの更新
   * @param all
   * @param user
   */
  [UPDATE_USER] ({ all } , { user }) {
    all[`user_${user.uid}`] = { ...all[`user_${user.uid}`], ...user };
  },
  /**
   * ユーザーの作成
   * @param all
   * @param user
   */
  [CREATE_USER] ({ all }, { user }) {
    // add object property
    Vue.set(all,`user_${user.uid}`, user)
  }
};

const actions = {
  /**
   * userFormモジュールから修正後のユーザーを受け取る
   * @param commit
   * @param user
   */
  applyEdit ({ commit }, { user }) {
    commit(UPDATE_USER, { user });
  },
  /**
   * ユーザーを作成する
   * @param commit
   * @param user
   */
  create ({ commit }, { user }) {
    commit(CREATE_USER, { user });
  }
};

const getters = {
  /**
   * id指定でユーザーを返す
   * @param state
   * @returns {function(*)}
   */
  getById: state => uid => {
    return state.all[`user_${uid}`];
  },
  /**
   * 全ユーザー数
   * @param state
   * @returns {number}
   */
  allCount: state => {
    return Object.keys(state.all).length;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
