const jwt = require('jsonwebtoken')


class TokenService {
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY,  { expiresIn: '30d'})

        return {accessToken, refreshToken}
    }
}