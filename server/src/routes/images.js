import { Router } from 'express';
import Table from '../table';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import params from '../config/s3config';
import { join } from 'path';


let images = new Table('images');
let locations = new Table('locations');
let router = Router();

AWS.config.update(params);
let s3 = new AWS.S3();

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'selfiestopimages',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.file.location);
    if (!req.body.locationid) {
        let picture = {
            image: req.file.location,
            userid: req.user.id,
            locationid: 141
        }
        images.insert(picture)
            .then(() => {
                console.log('Insert Successful');
                res.sendStatus(201);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });

    } else {
        let picture = {
            image: req.file.path,
            userid: req.user.id,
            locationid: req.body.locationid
        }

        images.insert(picture)
            .then(() => {
                res.sendStatus(201);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    images.getAllLocationImages(id)
        .then((locationImages) => {
            res.json(locationImages);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;