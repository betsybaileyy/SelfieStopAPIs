import mysql from 'mysql';
import config from '.';

let pool = mysql.createPool({
    connectionLimit: 10,
    host: config.env.DB_HOST,
    user: config.env.DB_USER,
    password: config.env.DB_PASS,
    database: config.env.DB_NAME
});

function executeQuery(sql, args = []) {
    return getConnection()
        .then((connection) => {
            return new Promise((resolve, reject) => {
                connection.query(sql, args, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
}

function callProcedure(procedureName, args = []) {
    let placeholders = generatePlaceholders(args);
    let callString = `CALL ${procedureName}(${placeholders});`; // CALL GetChirps();, or CALL InsertChirp(?,?,?);
    return executeQuery(callString, args);
}

function rows(procedureName, args = []) {
    return callProcedure(procedureName, args)
        .then((resultsets) => {
            return resultsets[0];
        });
}

function row(procedureName, args = []) {
    return callProcedure(procedureName, args)
        .then((resultsets) => {
            return resultsets[0][0];
        });
}

function empty(procedureName, args = []) {
    return callProcedure(procedureName, args)
        .then(() => {
            return;
        });
}

function generatePlaceholders(args = []) {
    let placeholders = '';
    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            if (i === args.length - 1) { // if we are on the last argument in the array
                placeholders += '?';
            } else {
                placeholders += '?,';
            }
        }
    }
    return placeholders;
}

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

export { row, rows, empty, executeQuery, generatePlaceholders };