const express = require('express');
const Router = express.Router();
const utility = require('utility')

const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req,res){
    // User.remove({},function(err,doc){})
    const {type} = req.query;
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})
Router.post('/login',function(req,res){
    const { user,pwd } = req.body;
    User.findOne({user,pwd:utility.md5(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
Router.post('/register',function(req,res){
    const { user,pwd,type } = req.body;
    console.log(user,pwd,type)
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名已经注册过'})
        }

        const userModel = new User({user,type,pwd:utility.md5(pwd)})
        userModel.save(function(err,doc){
            if(err){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user,type,_id} = doc;
            return res.json({code:0,data: {user,type,_id}})
        })
    })
})
Router.post('/update',function(req,res){
    // const { _id,avatar,position,company,money,require } = req.body
    const body = req.body;
    // const {_id,...userInfo} = body;
    User.findByIdAndUpdate(body._id,body,function(err,doc){
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        },body)
        return res.json({code:0,data})
    })
})
// Router.get('/info',function(req,res){
//     const {userId} = req.cookies;
//     if(!userId){
//         return res.json({code:1})
//     }
//     User.findOne({_id:userId},_filter,function(err,doc){
//         if(err){
//             return res.json({code:1,msg:'后端出错了'})
//         }
//         if(doc){
//             return res.json({code:0,data:doc})
//         }
//     })
// })

module.exports = Router;