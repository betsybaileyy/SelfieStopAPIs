import { join } from 'path';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import stateRouting from './middleware/routing.mw';
import configurePassport from './config/passport';

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();
app.use(express.urlencoded({ extended: false }));

morgan.token('type', function (req, res) { return req.headers['content-type'] })
app.use(morgan(':method :type :url :status :response-time ms - :res[content-length]'))
app.use(express.static(CLIENT_PATH));
app.use(express.json());

configurePassport(app);

app.use('/api', routes);

app.use(stateRouting);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// process.on('unhandledRejection', (reason, p) => {
//     // I just caught an unhandled promise rejection, since we already have fallback
//     // handler for unhandled errors (see below), let throw and let him handle that
//     console.error('Unhandled Promise Rejection');
//     console.error(reason);
// });

// process.on('uncaughtException', (error) => {
//     // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
//     console.error('Uncaught exception');

//     if (error.stack) {
//         console.error(error.stack);
//     } else {
//         console.error(error.message);
//     }
// });