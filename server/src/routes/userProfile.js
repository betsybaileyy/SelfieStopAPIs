import { Router } from 'express';
import Table from '../table';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import params from '../config/s3config';

let router = Router();

let users = new Table('users');
let images = new Table('images');

AWS.config.update(params);
let s3 = new AWS.S3();

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'selfiestopimages',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, Date.now() + '.jpg')
        }
    })
});

router.put('/', upload.single('image'), (req, res, next) => {
    let id = req.user.id;
    let row = {
        image: req.file.location
    }

    users.update(id, row)
        .then((newImage) => {
            console.log('Successful update!');
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

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
