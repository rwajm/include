const express = require("express");
const router = express.Router();
const member = require('../model/member');
const valid = require('../validator/data_valid');
const { isLoggedIn } = require('./middleware');
require('express-session');

// 전체 & 부분
router.get('/list', async(req, res) => {
    let keys = Object.keys(req.query);
    let values = Object.values(req.query);
    let verified = Object.assign({}, req.session);
    let compare = Boolean;
    
    if(keys.length === 1)
        compare = ([ keys[0] ].toString() === [ 'idx' ].toString())
    console.log(verified);
    
    if (keys.length === 1 && compare) {
        // http://localhost:8080/member/list?idx=
        await member.getByidx(values, (err, data) => {
            try {
                if (data !== null)  {
                    if(data.length === 0)  
                        res.status(404).json({ message: "Not Found" });
                    else
                        res.render('member/detail', { memberDetail : data[0] });
                }
                else if(err !== null)
                    res.json(data);
            }
            catch (err) {
                console.log("specific member router error " + err);
            }
        })
    }
    else if (keys.length === 0)  {
        // http://localhost:8080/member/list
        await member.getAll((err, data) => {
            try {
                if (data !== null)  {
                    if(data.length === 0)
                        res.status(404).json({ message: "Not Found" });
                    else
                        res.render('member/list', { memberList : data });
                }
                else if(err !== null)
                    res.json(data);
            }
            catch (err) {
                console.log("specific member router error " + err);
            }
        })
    }
    else
        res.status(400).json({ message: "Forbidden" });
})

router.get('/post', isLoggedIn, async(req, res) => {
    let key = Object.keys(req.query);
    let value = Object.values(req.query);
    let compare = Boolean;

    if(key.length === 1)
        compare = ([ key ].toString() === [ 'idx' ].toString())

    if(key.length === 1 && compare) {
        // http://localhost:8080/member/post?idx=
        await member.getByidx(value, (err, data) => {
            try {
                if(data !== null)    {
                    console.log(data);
                    res.render('member/post', { idx : true, data : data[0] });
                }
                else if(err !== null)
                    res.json(err);
            }
            catch(err)  {
                console.log("member post router error " + err);
            }
        })
    }
    else if(key.length === 0)
        res.render('member/post', { idx : false, data : '' });
    else
        res.redirect('/member/list');
})

router.post('/post', valid.CheckMemberInfo, valid.errorCallback, async(req, res) => {
    let key = Object.keys(req.query);
    let value = Object.values(req.query);
    let compare = Boolean;

    if(key.length === 1)
        compare = ([ key ].toString() === [ 'idx' ].toString())
    else if(key.length === 0) // ???????????
        compare = true;

    if(key.length === 1 && compare) {
        // http://localhost:8080/member/post?idx=

        let updateData = {
            year : req.body.year,
            semester : req.body.semester, 
            details : req.body.details,
            title : req.body.title,
            complete : req.body.complete
        }

        await member.modify(value, updateData, (err, data) => {
            try {
                if(data !== null)    {
                    res.redirect(`/member/list?idx=${value}`);
                }
                else if(err !== null)
                    res.json(err);
            }
            catch(err)  {
                console.log("member post router error " + err);
            }
        })
    }
    else if(key.length === 0 && compare)    {
        // http://localhost:8080/member/post

        let inputData = {
            year : req.body.year,
            semester : req.body.semester, 
            details : req.body.details,
            title : req.body.title,
            complete : req.body.complete
        }
        
        await member.create(inputData, (err, data) => {
            try {
                if(data !==  null)    {
                    res.redirect(`/member/list?idx=${value}`);
                }
                else if(err !== null)
                    res.json(err);
            }
            catch(err)  {
                console.log("member post router error " + err);
            }
        })
    }
    else
        res.status(404).json({ message : "Not found" });
})

// http://localhost:8080/member/list?idx=
router.delete('/list', isLoggedIn, async(req, res) => {
    let id = req.query.idx;

    await member.destroy(id, (err, data) => {
        try {
            if(data !== null) {
                res.redirect('/member/list');
            }
            else if(err !== null)
                res.json(err);
        }
        catch (err) {
            console.log("member delete router error " + err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
})


module.exports = router;