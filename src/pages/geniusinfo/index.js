import React,{Component} from 'react';
import { NavBar,Icon,List,InputItem,TextareaItem,Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios';
import Redirect from 'umi/redirect';
import AvatarSelector from './../../components/avatar-selector';

@createForm()
class GeniusInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            redirect: '',
            avatar: ''
        }
        this.selectAvatar = this.selectAvatar.bind(this);
        this.update =this.update.bind(this);
    }

    selectAvatar(text){
        this.setState({
            avatar: text
        })
    }
    update(){
        const data = this.props.form.getFieldsValue();
        data.avatar = this.state.avatar;
        const _id =JSON.parse(localStorage.getItem('userInfo'))._id
        axios.post('/api/user/update',{...data,_id})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                console.log('数据更新成功')
                localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                this.setState({
                    redirect: '/genius'
                })
            }else{
                console.log(res.data.msg)
            }
        })
    }

    render(){
        const { getFieldProps } =this.props.form;
        return(
            <div>
                {this.state.redirect?<Redirect to={this.state.redirect} />:null}
                <NavBar
                    mode="dark"
                    leftContent="Back"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >牛人完善信息</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                />
                <List>
                    <InputItem
                        {...getFieldProps('position')}
                    >求职岗位</InputItem>
                    <TextareaItem
                        {...getFieldProps('desc')}
                        title='个人简介'
                        rows={3}
                        autoHeight
                    />
                    <Button type='primary' onClick={this.update}>保存</Button>
                </List>
            </div>
        )
    }
}

export default GeniusInfo;