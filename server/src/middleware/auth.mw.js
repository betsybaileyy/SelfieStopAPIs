import passport from 'passport';

function tokenMiddleware(req, res, next) {
    passport.authenticate('bearer', { session: false })(req, res, next);
}

function isLoggedIn(req, res, next) {
    console.log('test');
    console.log(req.user.id);
    if (req.user) {
        next();
    } else {
        res.send(401);
    }
}

export { tokenMiddleware, isLoggedIn };