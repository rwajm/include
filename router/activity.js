const express = require("express");
const router = express.Router();
const ACTIVITY = require('../model/activity');

// ex) http://localhost:8080/activity/list?year=22&semester=2
// http://localhost:8080/activity/list
router.get('/list', async(req, res) => {
    
    let period = req.query;

    await ACTIVITY.getActivityByPeriod(period, (err, data) => {
        try {
            //데이터가 없을때 뭘 보내야 좋을까
            if(data.length === 0)
                res.json("null");
            else
                res.json(data);
        }
        catch(err) {
            console.error("router error " + err);
        }
    })
})

// http://localhost:8080/activity/create
router.post('/create', async(req, res) => {
    
    let activity = {
        year : req.body.year,
        semester : req.body.semester,
        details : req.body.details,
        title : req.body.title,
        complete : req.body.complete
    }

    await ACTIVITY.create(activity, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})

//CRUD

//Read - select, get
//Create - insert, post
//Update - update, put

//update
// http://localhost:8080/member/update/:idx
router.put('/update/:idx', async(req, res) => {

    let activity = {
        year : req.body.year,
        semester : req.body.semester,
        details : req.body.details,
        title : req.body.title,
        complete : req.body.complete
    }

    await ACTIVITY.modify(req.params.idx, activity, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})

// http://localhost:8080/member/delete/:idx
router.delete('/delete/:idx', async(req, res) => {
    
    await ACTIVITY.destroy(req.params.idx, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
})


module.exports = router;