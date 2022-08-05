import jwt from 'jsonwebtoken'

class TokenService {

    generateToken = async (user) => {
        return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '5d'})
    }

    decode = async (token) => {
        return jwt.verify(token, process.env.JWT_SECRET)
    }

}

export default new TokenService()