import { Router } from 'express';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let router = Router();

let iamges = new Table('images');



router.post('/', upload.single('image'), (req, res, next) => {

    let picture = {
        image: req.file.path,
        userid: req.user.id
    }


    // images.insert(picture)
    //     .then(() => {
    //         res.sendStatus(201);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
});

export default router;