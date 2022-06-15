const getDefaultState = () => {
  return {
    ajaxToken: [],   //准备一个容器，放所有请求的
  }
}

const state = getDefaultState()

const mutations = {
  PUSH_TOKEN: (state, cancel) => {
    state.ajaxToken = [...state.ajaxToken, cancel]
  },
  CLEAR_TOKEN: (state) => {
    // 依次取消
    state.ajaxToken.forEach(cancel => cancel())
    state.ajaxToken = []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}

