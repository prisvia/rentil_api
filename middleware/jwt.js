import db from '../db/db.js'
import { schemaReferences } from '../constants/index.js'
import TokenService from '../services/token.js'
import { ValidationError } from '../models/validationError.js'

class JwtVlidations {

    validateUser = async (req, res, next) => {
        try {
            const token = req.headers['token'].replace('Bearer ', '')
            const decodedData = await TokenService.decode(token)
            const user = await db(schemaReferences.user).where({ id: decodedData.user }).first()
            if (!user) return res.sendStatus(401)
            req.user = user
            return next()
        } catch (error) {
            return res.sendStatus(401)
        }
    }

}

export default new JwtVlidations()