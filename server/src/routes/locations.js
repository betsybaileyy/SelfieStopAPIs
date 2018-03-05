import { Router } from 'express';
import Table from '../table';
let router = Router();

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let locations = new Table('locations');

router.get('/:typeid/:id?', (req, res) => {
    let id = req.params.id;
    let typeid = req.params.typeid;

    if (!id) {
        locations.getAllLocations(typeid)
            .then((locations) => {
                res.json(locations);
                console.log();
            });

    } else {
        locations.getOne(id)
            .then((location) => {
                res.json(location);
            });
    }
});



router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.user);

    let post = {
        image: req.file.path,
        name: req.body.name,
        description: req.body.description,
        categoryid: req.body.categoryid,
        address: req.body.address
    }

    locations.insert(post)
        .then(() => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
        });
});

export default router;