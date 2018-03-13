let dbConfig = process.env;
let s3Config = process.env;

import { dbParams, s3Params } from './config';


if (!dbConfig.DB_HOST) {
    dbConfig = dbParams; //require('./config').default;
}

if (!s3Config.region) {
    s3Config = s3Params; //require('./config').default;
}

export { dbConfig, s3Config };
