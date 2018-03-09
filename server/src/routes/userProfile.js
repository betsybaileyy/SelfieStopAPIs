import { Router } from 'express';
import Table from '../table';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';

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

router.put('/id', (req, res) => {
    let id = req.params.id;
    let row = req.body.image;

    users.update(id, row)
        .then((newImage) => {
            console.log('Successful update!');
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;
