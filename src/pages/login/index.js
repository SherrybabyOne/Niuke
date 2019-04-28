import React,{Component} from 'react';
import { WhiteSpace,WingBlank,List,InputItem,Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import router from 'umi/router';
import axios from 'axios';
import Logo from './../../components/logo';

@createForm()
class Login extends Component{
    constructor(props){
        super(props);
        this.state= {

        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(){
        let userInfo = this.props.form.getFieldsValue();
        if(!userInfo.user || !userInfo.pwd){
            console.log('请输入用户名或密码');
            return 0;
        }
        axios({
            method: 'post',
            url: 'api/user/login',
            data: userInfo
        }).then((response)=>{
            if(response.status === 200){
                const res = response.data;
                if(res.code === 0){
                    console.log('登陆成功')
                    const user = JSON.stringify(res.data);
                    localStorage.setItem('userInfo',user)
                    router.push('/')
                }else{
                    console.log(res.msg)
                }
            }else{
                console.log('网络错误')
            }
        })
    }
    handleRegister(){
        router.push('/register')
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div>
                <Logo />
                <WingBlank>
                    <List renderHeader={'登录页面'}>
                        <InputItem
                            {...getFieldProps('user')}
                            placeholder='请输入用户名'
                        >用户名</InputItem>
                        <InputItem
                            {...getFieldProps('pwd')}
                            placeholder='请输入密码'
                            type='password'
                        >密码</InputItem>
                        <WhiteSpace />
                        <Button type='primary' size='small' style={{width:'40vw',display:'inline-block'}} onClick={this.handleLogin}>登录</Button>
                        <Button type='primary' size='small' style={{width:'40vw',display:'inline-block',marginLeft:'10vw'}} onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Login;