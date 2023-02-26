exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    else
        res.status(401).send('로그인을 해주세요');
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    else
        res.status(400).send('로그인이 되어있습니다');
};