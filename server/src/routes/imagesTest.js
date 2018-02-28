import { Router } from 'express';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let router = Router();

let imagesTest = new Table('imagesTest');

router.post('/profile', upload.single('image'), (req, res, next) => {
    let post = {
        image: req.file.path
    }
    imagesTest.insert(post)
        .then(() => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
        });
});



export default router;