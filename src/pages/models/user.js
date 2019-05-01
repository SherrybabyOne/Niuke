import axios from 'axios';
export default{
    namespace: 'user',
    state: {
        userList: [],
        bossList: []
    },
    reducers: {
        getUserList(state,{payload}){
            return{
                ...state,
                userList: payload
            }
        },
        getBossList(state,{payload}){
            return{
                ...state,
                bossList: payload
            }
        },
    },
    effects: {
        *getUser({payload},{call,put}){
            const data = yield axios({
                url: 'api/user/list',
                method: 'get',
                params: {
                    type: 'genius'
                }
            }).then(res=>{
                if(res.data.code === 0){
                    return res.data.data
                }
            })
            yield put({type:'getUserList',payload: data})
        },
        *getBoss({payload},{call,put}){
            const data = yield axios({
                url: 'api/user/list',
                method: 'get',
                params: {
                    type: 'boss'
                }
            }).then(res=>{
                if(res.data.code === 0){
                    return res.data.data
                }
            })
            yield put({type:'getBossList',payload: data})
        }
    }
}