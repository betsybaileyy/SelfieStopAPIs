import { Router } from 'express';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let router = Router();

let users = new Table('users');

router.get('/:id', (req, res) => {
    let id = req.body.id;

    users.getOne(id)
        .then((user) => {
            res.json(user);
        });

});

router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.user);

    let post = {
        image: req.file.path,
        userid: req.user.id,
        location: req.body.location
    }

    images.insert(post)
        .then(() => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
        });
});

export default router;