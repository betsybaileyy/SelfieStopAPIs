import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Table from '../table';
import { encode, decode } from '../utils/tokens';
import { checkPassword } from '../utils/security';

let authorsTable = new Table('authors');
let tokensTable = new Table('tokens');

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    }, (email, password, done) => {
        authorsTable.find({ email })
            .then((results) => results[0])
            .then((author) => {
                if (author && author.hash) {
                    checkPassword(password, author.hash)
                        .then((matches) => {
                            if (matches === true) {
                                // password is correct
                                tokensTable.insert({
                                    authorid: author.id
                                })
                                    .then((idObj) => encode(idObj.id))
                                    .then((token) => {
                                        return done(null, { token });
                                    });
                            } else {
                                // password is incorrect
                                return done(null, false, { message: 'Invalid credentials' });
                            }
                        }).catch((err) => {
                            throw err;
                        });
                } else {
                    return done(null, false, { message: 'Invalid credentials' });
                }
            }).catch((err) => {
                return done(err);
            });
    }));

    passport.use(new BearerStrategy((token, done) => {
        let tokenId = decode(token);
        if (!tokenId) {
            return done(null, false, { message: 'Invalid token' });
        }
        tokensTable.getOne(tokenId)
            .then((tokenRecord) => {
                return authorsTable.getOne(tokenRecord.authorid);
            }).then((author) => {
                if (author) {
                    delete author.password;
                    return done(null, author);
                } else {
                    return done(null, false, { message: 'Invalid token' });
                }
            }).catch((err) => {
                return done(err);
            });
    }))

    app.use(passport.initialize());
}

export default configurePassport;