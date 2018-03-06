import { join } from 'path';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import stateRouting from './middleware/routing.mw';
import configurePassport from './config/passport';

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();
app.use(express.urlencoded({ extended: false }));

// morgan.token('type', function (req, res) { return req.headers['content-type'] })
// app.use(morgan(':method :type :url :status :response-time ms - :res[content-length]'))
app.use(morgan('dev'));
app.use(express.static(CLIENT_PATH));
app.use(express.json());

configurePassport(app);

app.use('/api', routes);

app.use(stateRouting);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
