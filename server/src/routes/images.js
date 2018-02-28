import { Router } from 'express';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let router = Router();

let images = new Table('images');
let locations = new Table('locations');

router.post('/', upload.single('image'), (req, res, next) => {

    let picture = {
        image: req.file.path,
        userid: req.user.id,
        locationName: req.body.location
    }

    images.insert(picture)
        .then(() => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
        });
});

export default router;