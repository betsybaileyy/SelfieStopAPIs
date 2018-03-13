import mysql from 'mysql';
import { dbConfig } from '.'; //config

let pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.DB_HOST,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASS,
    database: dbConfig.DB_NAME
});

function executeQuery(sql, args = []) {
    return getConnection()
        .then((connection) => {
            return new Promise((resolve, reject) => {
                connection.query(sql, args, (err, result) => {
                    connection.release();
                    if (err) {
                        console.log('nah');
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