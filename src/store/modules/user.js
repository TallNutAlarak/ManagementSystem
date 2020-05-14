import { getToken, setToken, getUser, setUser, removeToken } from '@/utils/auth'
import { login, getUserInfo, logout } from '@/api/login'

const user = {
    state: {
        // 作为token初始值，避免刷新回到登陆
        token: getToken(),
        user: getUser(),
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            setToken(token)
        },
        SET_USER(state, user) {
            state.user = user;
            setUser(user)
        }
    },
    actions: {
        Login({ commit }, form) {
            // resolve触发成功处理，reject触发异常处理
            return new Promise((resolve, reject) => {
                login(form.username.trim(), form.passsword).then(res => {
                    const resp = res.data;
                    commit('SET_TOKEN', resp.data.token)
                    // 通知组件已将token更新成果
                    resolve(resp)
                }).catch(error => {
                    reject(error)
                })
            })

        },
        // 通过token获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise(
                (resolve, reject) => {
                    console.log('state.token', state.token)
                    getUserInfo(state.token).then(
                        res => {
                            const respUser = res.data
                            commit('SET_USER', respUser.data)
                            resolve(respUser)
                        }
                    ).catch(error => {
                        reject(error)
                    })
                }
            )
        },
        Logout({ commit, state }) {
            return new Promise(
                (resolve, reject) => {
                    logout(state.token).then(
                        res => {
                            const resp = res.data
                            commit('SET_TOKEN', '')
                            commit('SET_USER', null)
                            removeToken()
                            resolve(resp)
                        }).catch(error => {
                            reject(error)
                        })
                }
            )
        }

    }
}

export default user