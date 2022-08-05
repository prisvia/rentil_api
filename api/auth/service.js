import db from '../../db/db.js'
import { schemaReferences } from '../../constants/index.js'
import TokenService from '../../services/token.js'
import HashService from '../../services/hash.js'
import { ResponseModel } from '../../models/response.js'

export class AuthService {

    signUp = async (body) => {
        const { username, password, role, birthDate, gender, phone, email, deleted, country } = body

        const passwordHash = await HashService.encode(password)

        const user = await db(schemaReferences.user).insert({
            username, password: passwordHash, role, birthDate, gender, phone, email, deleted, country
        }).returning(['id'])

        const token = await TokenService.generateToken(user[0].id)
        return new ResponseModel(true, 'user registerd', token)
    }

    signIn = async (user) => {
        const token = await TokenService.generateToken(user.id)
        return new ResponseModel(true, 'user signed in', token)
    }

}