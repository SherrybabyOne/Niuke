import React,{Component} from 'react';
import { Card,WingBlank,WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import router from 'umi/router';

class Main extends Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    constructor(props){
        super(props);
        this.state={

        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(v){
        router.push(`/chat/${v.user}`)
    }

    render(){
        const {data} = this.props;
        return(
            <div>
                <WingBlank>
                    <WhiteSpace />
                    {data.length>0?
                        (data.map(v=>(
                            v.avatar?
                            <Card
                                key={v._id}
                                onClick={this.handleClick(v)}
                            >
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`./../../assets/avatar/${v.avatar}.png`)}
                                    extra={v.position}
                                ></Card.Header>
                                <Card.Body>
                                    {v.type==='boss'?<div>公司:{v.company}</div>:null}
                                    {v.desc.split('\n').map(d=>(
                                        <div key={d}>{d}</div>
                                    ))}
                                    {v.type==='boss'?<div>薪资:{v.money}</div>:null}
                                </Card.Body>
                            </Card>
                            :null
                        )))
                        :null
                    }
                </WingBlank>
            </div>
        )
    }
}

export default Main;