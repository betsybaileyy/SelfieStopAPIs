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
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, Date.now() + '.jpg')
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

router.get('/:id?', (req, res) => {
    let id = req.params.id;

    if (!id) {
        images.getAll() // GETS all images from database. Displays from newest to oldest.
            .then((images) => {
                res.json(images);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    } else {
        images.getAllLocationImages(id) // GETS all images from a specific category
            .then((locationImages) => {
                res.json(locationImages);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    }
});

export default router;