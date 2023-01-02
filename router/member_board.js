const { query } = require('express');
const express = require('express');
const router = express.Router();
const memberSerive = require('../model/memberService');

//멤버 정보 전체 로드
//http://localhost:8080/memberBoard/list
router.get('/list', async(req, res) => {

    await memberSerive.getAll((err, data) =>  {
        try {
            res.json(data)
        }
        catch(err)  {
            console.error();
        }
    })
})

// {
//      "idx" : 3,
//     "studentID" : "2073333",
//     "name" : "이재현",
//     "first_track" : "문문콘",
//     "second_track" : "",
//     "git_hub" : "https://git_hub.com/lee_jaehyun",
//     "phone_number" : "01234567890",
//     "email" : "req.body.email",
//      "graduation" : 0
// }

//멤버 정보 생성
//http://localhost:8080/memberBoard/create
router.post('/create', async(req, res) => {

    //idx 자동 계산은 어떻게 하지?
    //넣지 않은거 없는지 체크하기 NULL

    let member = {
        idx : 3,
        studentID : req.body.studentID,
        name : req.body.name,
        first_track : req.body.first_track,
        second_track : req.body.second_track,
        git_hub : req.body.git_hub,
        phone_number : req.body.phone_number,
        email : req.body.email,
        graduation : 0
    }
    
    await memberSerive.create(member, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error();
        }
    })
})

//멤버정보 수정
// http://localhost:8080/memberBoard/update
router.put('/update', async(req, res) => {
    
    //DB에 저장되어있는 멤버가 맞는지 == 유효성 체크
    //memberSerive.findbystudendID 사용
    // const valid_member = '';
    // if(!valid_member)   {
    //     return res.status(404).send('student was not found');
    // }
    
    
    let member = {
        name : req.body.name,
        first_track : req.body.first_track,
        second_track : req.body.second_track,
        git_hub : req.body.git_hub,
        phone_number : req.body.phone_number,
        email : req.body.email,
        graduation : req.body.graduation
    }

    await memberSerive.update(member, req.query, (err, data) => {
        try {
            res.json(
                {
                    result:"Ok",
                    code:200,
                    data:Object.values(req.query)[0] + "이 수정되었습니다."
                }
            );
        }
        catch(err)  {
            console.error();
        }
    })
})

//멤버정보 삭제
// http://localhost:8080/memberBoard/delete?idx=
router.delete('/delete', async(req, res) => {

    //삭제 시, idx 자동 위아래로 변경해줘야하는데 이건 어떻게 하지?

    await memberSerive.delete(req.query, (err, data) => {
        try {
            res.json(
            {
                result:"Ok",
                code:200,
                data:Object.values(req.query)[0] + "이 삭제되었습니다."
            });
        }
        catch(err){
            console.error();
        }
    })
})

module.exports = router;