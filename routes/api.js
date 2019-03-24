const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome'
    });
});

verfyToken = (req, res, next) => {
    console.log("req:",req.headers);
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];

        req.token = bearerToken;
        //Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

router.post('/posts', verfyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        console.log("err:",err);
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Posts created',
                authData
            })
        }
    });
});

router.post('/login', (req, res) => {
    //Mock User
    const user = {
        id: 1,
        username: 'rimita',
        email: 'rimita.de@infosys.com'
    }

    jwt.sign({ user }, 'secretkey', {expiresIn: '2m'}, (err, token) => {
        res.json({
            token
        });
    });
});

module.exports = router