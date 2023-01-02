const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const member_board_router = require('./router/member_board');

app.set('port', process.env.PORT || 8080);

// app.get('/', (req, res) =>{
//     res.json({test : "hello!"});
// });

app.use(bodyParser.json());

app.use('/memberBoard', member_board_router);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});