const expressJWT = require('express-jwt').expressjwt;

function authJwt(params) {
    const secret = process.env.MY_SECRET;
    const api = process.env.API_URL;
    return expressJWT({
        secret,
        algorithms: ['HS256'],
        // isRevoked: Revoked
    }).unless({
        path: [
           `${api}/users/login`,
           `${api}/users/register`
        ]
    })
}

async function Revoked(req,payload,done) {
    if(!payload.isAdmin) return done(null,true)

    return done()
}
module.exports = authJwt;