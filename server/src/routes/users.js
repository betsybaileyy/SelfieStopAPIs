import { Router } from 'express';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let router = Router();

let users = new Table('users');
let images = new Table('images');

router.get('/:id', (req, res) => {
    let id = req.params.id;

    users.getOne(id)
        .then((user) => {
            res.json(user);
        });
});

router.get('/:id/selfies', (req, res) => {
    let id = req.params.id;

    images.getAllUserImages(id)
        .then((images) => {
            res.json(images);
        });
});

export default router;