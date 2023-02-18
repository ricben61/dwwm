const expressJwt = require('express-jwt');

async function isRevoked(req, token){
    if(!token.payload.isAdmin){
        return true
    }

    return undefined
} 

function authJwt(){
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt.expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            // À réactiver quand on a terminé le dashboard
            // {url:/\/public\/uploads(.*)/, methods: ['GET','OPTIONS']},
            // {url:/\/api\/v1\/products(.*)/, methods: ['GET','OPTIONS']},
            // {url:/\/api\/v1\/categories(.*)/, methods: ['GET','OPTIONS']},
            // `${api}/users/login`,
            // `${api}/users/register`,
            {url: /(.*)/},
        ]
    })
    
}


module.exports = authJwt;
