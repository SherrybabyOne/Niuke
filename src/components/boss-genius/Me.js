import React,{Component} from 'react';
import { Result,List,WingBlank,WhiteSpace,Button,Modal } from 'antd-mobile';
import Redirect from 'umi/redirect';
const ListItem = List.Item;
const ListItemBrief = List.Item.Brief;
const alert = Modal.alert;

class Me extends Component{
    constructor(props){
        super(props);
        this.state={
            redirect: ''
        }
        this.renderHeader = this.renderHeader.bind(this);
        this.logout = this.logout.bind(this);
    }
    renderHeader(type){
        if(type === 'boss'){
            return '招聘职位简介'
        }else{
            return '个人简介'
        }
    }
    logout(){
        alert('注销', '确认退出登录吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {localStorage.removeItem('userInfo');this.setState({redirect:'/login'})  }},
          ])
        }

    render(){
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return(
            <div>
                {this.state.redirect?
                <Redirect to={this.state.redirect} />
                :
                <div>
                    <Result
                        img={<img  src={require(`./../../assets/avatar/${userInfo.avatar}.png`)} alt='' />}
                        title={userInfo.user}
                        message={userInfo.type === 'boss'?userInfo.company:null}
                    />
                    <WingBlank>
                        <List renderHeader={()=>this.renderHeader('boss')}>
                            <ListItem
                                multipleLine={true}
                            >
                                {userInfo.position}
                                {userInfo.desc.split('\n').map(v=><ListItemBrief key={v}>{v}</ListItemBrief>)}
                                {userInfo.money?<ListItemBrief>{`薪资：${userInfo.money}`}</ListItemBrief>:null}
                            </ListItem>
                            <WhiteSpace />
                            <ListItem>
                                <Button onClick={this.logout}>退出登录</Button>
                            </ListItem>
                        </List>
                    </WingBlank>
                </div>
                }
            </div>
        )
    }
}

export default Me;