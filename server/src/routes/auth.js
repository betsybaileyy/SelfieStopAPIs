import { Router } from 'express';
import passport from 'passport';
import { encode } from '../utils/tokens';
import { generateHash } from '../utils/security';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let users = new Table('users');

let router = Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        console.log(token);
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!token) {
            return res.status(401).json(info);
        } else {
            return res.status(201).json(token);
        }
    })(req, res, next);
});

router.post('/signup', upload.single('image'), (req, res, next) => {
    generateHash(req.body.password)
        .then((hash) => {

            let newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                bio: req.body.bio,
                image: req.file.path
            }

            console.log(newUser);
            //     users.insert(newUser)
            //         .then(() => {
            //             res.sendStatus(201);
            //         }).catch((err) => {
            //             console.log(err);
            //         });
            // }).catch((err) => {
            //     next(err);
            // });
        });

});



export default router;