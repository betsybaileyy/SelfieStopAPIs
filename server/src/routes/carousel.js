import { Router } from 'express';
import Table from '../table';
let router = Router();

let locations = new Table('locations');

router.get('/', (req, res) => {
    locations.getAllCarousel()
        .then((locations) => {
            res.json(locations);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;