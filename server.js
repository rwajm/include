const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();
const memberBoardRouter = require('./router/memberRegister');
const activityBoardRouter= require('./router/activity');


app.set('port', process.env.PORT || 8080);

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.use('/member', memberBoardRouter);
app.use('/activity', activityBoardRouter);


app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});