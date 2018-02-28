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

router.get('/selfies', (req, res) => {
    let id = req.body.id;

    images.getAllUserImages(id)
        .then((selfies) => {
            res.json(selfies);
        });
});

export default router;