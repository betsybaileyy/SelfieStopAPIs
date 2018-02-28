import { Router } from 'express';
import Table from '../table';
let router = Router();

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let locations = new Table('locations');

router.get('/:id?', (req, res) => {
    let id = 41;
    let type = 21;

    if (!id) {
        locations.getAllLocations(type)
            .then((locations) => {
                res.json(locations);
            });

    } else {
        locations.getOne(id)
            .then((location) => {
                res.json(location);
            });
    }
});

export default router;