import { Router } from 'express';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let router = Router();

let images = new Table('images');

router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.user);

    let post = {
        image: req.file.path,
        userid: req.user.id,
    }

    images.insert(post)
        .then(() => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
        });
});



export default router;