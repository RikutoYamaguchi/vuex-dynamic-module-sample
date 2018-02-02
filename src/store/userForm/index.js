/**
 * stateは関数でオブジェクトを返すようにする。
 * 公式ドキュメント：
 * `モジュールの状態を宣言するために単純なオブジェクトを使用すると、
 * その状態オブジェクトは参照によって共有され、
 * 変更時にクロスストア/モジュールの状態汚染を引き起こします。`
 */
const state = () => {
  return {
    user: {
      uid: '',
      name: '',
      tel: '',
      email: ''
    }
  }
};

// mutation types
const SET_UID = 'set_uid';
const SET_INITIAL_DATA = 'set_initial_data';
const UPDATE_VALUE = 'update_value';

const mutations = {
  /**
   * ユーザーID
   * @param state
   * @param uid
   */
  [SET_UID] (state, { uid }) {
    state.user.uid = uid
  },
  /**
   * 初期データ
   * @param state
   * @param user
   */
  [SET_INITIAL_DATA] (state, { user }) {
    state.user = { ...state.user, ...user }
  },
  /**
   * 値の更新
   * @param state
   * @param prop
   * @param value
   */
  [UPDATE_VALUE] (state, { prop, value }) {
    state.user[prop] = value;
  }
};

const actions = {
  /**
   * 初期化
   * 編集時はuser情報代入、作成時はuid作成
   * @param commit
   * @param rootGetters
   * @param uid
   */
  initialize ({ commit, rootGetters }, { uid } = {}) {
    if (uid) {
      const user =  rootGetters['user/getById'](uid);
      commit(SET_INITIAL_DATA, { user })
    } else {
      const count = rootGetters['user/allCount'];
      commit(SET_UID, { uid: count + 1 })
    }
  },
  /**
   * 値の更新
   * @param commit
   * @param prop
   * @param value
   */
  updateValue ({ commit }, { prop, value }) {
    commit(UPDATE_VALUE, { prop, value })
  },
  /**
   * 編集アクション
   * @param state
   * @param dispatch
   */
  editSubmit ({ state, dispatch }) {
    dispatch('user/applyEdit', { user: state.user }, { root: true })
  },
  /**
   * 作成アクション
   * @param state
   * @param dispatch
   */
  createSubmit ({ state, dispatch }) {
    dispatch('user/create', { user: state.user }, { root: true })
  }
};

const getters = {
  /**
   * 編集しているかどうか
   * @param user
   * @param getters
   * @param rootState
   * @param rootGetters
   * @returns {boolean}
   */
  isEdited: ({ user }, getters, rootState, rootGetters) => {
    const beforeUser = rootGetters['user/getById'](user.uid);
    // 比較は簡易的
    return JSON.stringify(beforeUser) !== JSON.stringify(user);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
