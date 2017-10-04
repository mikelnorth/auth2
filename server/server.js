const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    config = require('./../.config.js')
PORT = 3005;

const app = express();

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: config.domain,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
}, function (accessToken, refreshToken, extraParams, profile, done) {

    done(null, profile);
}));



app.get(`/auth`, passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth'
}))

app.get('auth/me', (req, res) => {
    if (!req.user) {
        return res.status(401).send('No user found')
    }
    return res.status(200).send(req.user)
})



passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})



app.listen(PORT, () => console.log(`server running on ${PORT}`));