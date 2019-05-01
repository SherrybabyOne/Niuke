import React,{Component} from 'react';
import { TabBar,NavBar } from 'antd-mobile';
import {connect} from 'dva';
import Main from './../../components/boss-genius/Main';
import Me from './../../components/boss-genius/Me';

@connect(
  ({user})=>({user})
)
class TabBarExample extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'geniusTab',
        hidden: false
      };
    }
    componentDidMount(){
      this.props.dispatch({type:'user/getUser'}) 
    }

    renderContent(pageText) {
      switch(pageText){
        case '牛人列表':
          return(
            <div style={{height:'100%'}}>
                <NavBar mode='dark'>{pageText}</NavBar>
                <Main data={this.props.user.userList} />
            </div>
          )
        case '消息列表':
          return (
            <div style={{height:'100%'}}>
              <NavBar mode='dark'>{pageText}</NavBar>
            </div>
          )
        case '我的信息':
          return(
            <div style={{height:'100%'}}>
                <NavBar mode='dark'>{pageText}</NavBar>
                <Me />
            </div>
          )
        default:
          return(
            <div style={{height:'100%'}}>
                <NavBar mode='dark'>{pageText}</NavBar>
            </div>
          )
      }
    }

    render(){
        return(
          <div style={{height:'100vh'}}>
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#33A3F4"
              barTintColor="white"
              hidden={this.state.hidden}
            >
              <TabBar.Item
                title="牛人"
                key="genius"
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(http://pqpyete45.bkt.clouddn.com/images/boss.png) center center /  21px 21px no-repeat' }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(http://pqpyete45.bkt.clouddn.com/images/boss-active.png) center center /  21px 21px no-repeat' }}
                />
                }
                selected={this.state.selectedTab === 'geniusTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'geniusTab',
                  });
                }}
              >
                {this.renderContent('牛人列表')}
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(http://pqpyete45.bkt.clouddn.com/images/msg.png) center center /  21px 21px no-repeat' }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(http://pqpyete45.bkt.clouddn.com/images/msg-active.png) center center /  21px 21px no-repeat' }}
                  />
                }
                title="消息"
                key="msg"
                selected={this.state.selectedTab === 'msgTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'msgTab',
                  });
                }}
              >
                {this.renderContent('消息列表')}
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(http://pqpyete45.bkt.clouddn.com/images/user.png) center center /  21px 21px no-repeat' }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(http://pqpyete45.bkt.clouddn.com/images/user-active.png) center center /  21px 21px no-repeat' }}
                  />
                }
                title="我"
                key="Me"
                selected={this.state.selectedTab === 'meTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'meTab',
                  });
                }}
              >
                {this.renderContent('我的信息')}
              </TabBar.Item>
            </TabBar>
          </div>
        )
    }

}

export default TabBarExample;