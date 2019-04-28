import React,{Component} from 'react';
import { WhiteSpace,WingBlank,List,InputItem,Button,Radio } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios';
import router from 'umi/router';
import Logo from './../../components/logo';
const RadioItem = Radio.RadioItem;

@createForm()
class Login extends Component{
    constructor(props){
        super(props);
        this.state= {
            userInfo: {
                type: 'genius'
            }
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.request = this.request.bind(this);
    }

    handleRegister(){
        let userInfo= this.props.form.getFieldsValue();
        if(userInfo.pwd !== userInfo.pwdAgain){
            console.log('两次密码输入不一致');
            return 0;
        }
        userInfo = {
            user: userInfo.user,
            pwd: userInfo.pwd,
            type: this.state.userInfo.type
        };
        this.request(userInfo)
    }
    handleChange(i){
        this.setState({
            userInfo: {
                type: i
            }
        })
    }
    request(userInfo){
        axios.post('/api/user/register',{
            ...userInfo
        }).then((response)=>{
            if(response.status === 200){
                const res = response.data;
                if(res.code === 0){
                    const userInfo = JSON.stringify(res.data);
                    localStorage.setItem('userInfo',userInfo);
                    router.push('/');
                }else{
                    console.log(res.msg)
                }
            }else{
                console.log('未请求到服务器')
            }
        })
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div>
                <Logo />
                <WingBlank>
                    <List renderHeader={'注册页面'}>
                        <InputItem
                            {...getFieldProps('user')}
                            placeholder='请输入用户名'
                        >用户名</InputItem>
                        <InputItem
                            {...getFieldProps('pwd')}
                            placeholder='请输入密码'
                            type='password'
                        >密码</InputItem>
                        <InputItem
                            {...getFieldProps('pwdAgain')}
                            placeholder='请输入密码'
                            type='password'
                        >确认密码</InputItem>
                        <RadioItem
                            checked={this.state.userInfo.type === 'genius'}
                            onChange={()=>this.handleChange('genius')}
                            defaultChecked
                        >牛人</RadioItem>
                        <RadioItem
                            checked={this.state.userInfo.type === 'boss'}
                            onChange={()=>this.handleChange('boss')}
                        >Boss</RadioItem>
                        <WhiteSpace />
                        <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Login;