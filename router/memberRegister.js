const express = require("express");
const router = express.Router();
const MEMBER = require('../model/member');

// http://localhost:8080/member/:reservedWord
router.get('/:reservedWord', async(req, res) => {

    let result = {
        code : 404,
        message : "Not found"
    }
    
    //html
    if(isNaN(req.params.reservedWord))  {
        (req.params.reservedWord === 'create') 
        ? res.render('member/create') //혹시 원하는 페이지로 이동하지 않는다면 여길 손봐주세요
        : (req.params.reservedWord === 'list')
        ? await MEMBER.getAll((err, data) => {
            try {
                res.render('member/list', { memberList : data })
            }
            catch(err)  {
                console.error("router error " + err);
                res.status(503);
            }
        })
        : res.json(result)
    }
    else    {
        await MEMBER.getByidx(req.params.reservedWord, (err, data) => {
            try {
                res.json(data);
                //res.render('member/detail', { memberDetail : data });
            }
            catch(err) {
                console.error("router error " + err);
                res.json(result);
            }
        })
    }

    //react
    //list 문자열이 입력된다면
    //http://localhost:8080/member
    if(isNaN(req.params.reservedWord))  {
        (req.params.reservedWord === 'list')
        ? await MEMBER.getAll((err, data) => {
            try {
                res.json(data);
            }
            catch(err)  {
                console.error("router error " + err);
                res.json(result);
            }
        })
        : res.json(result)
    }
    else    {
        await MEMBER.getByidx(req.params.idx, (err, data) => {
            try {
                res.json(data);
            }
            catch(err) {
                console.error("router error " + err);
                res.json(result);
            }
        })
    }
})

// http:localhost:8080/member/create
router.post('/create', async(req, res) => {
    
    //로그인되어있는게 맞는지, 그렇지 않다면 list로 되돌아가게끔

    let registerInfo = {
        studentID: req.body.studentID,
        name: req.body.name,
        first_track: req.body.first_track,
        second_track: req.body.second_track,
        git_hub: req.body.git_hub,
        email: req.body.email,
        graduation: 0   
    }

    await MEMBER.create(registerInfo, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})
//수정 버튼 눌렀을 시 수정 페이지 렌더링 되어야함
// http://localhost:8080/member/:idx
router.put('/:idx', async(req, res) => {

    let member = {
        name: req.body.name,
        first_track: req.body.first_track,
        second_track: req.body.second_track,
        git_hub: req.body.git_hub,
        email: req.body.email,
        graduation: 0
    }

    await MEMBER.modify(req.params.idx, member, (err, data) => {
        try {
            //react
            res.json(data);

            //html
            //res.redirect('/member/list');
        }
        catch(err)  {
            console.error(err);
        }
    })
})

// http://localhost:8080/member/:idx
router.delete('/:idx', async(req, res) => {
    
    await MEMBER.destroy(req.params.idx, (err, data) => {
        try {
            //react
            res.json(data);

            //html
            //res.redirect('/member/list');
        }
        catch(err) {
            console.error(err);
        }
    })
})

module.exports = router