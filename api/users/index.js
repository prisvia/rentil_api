import { Router } from "express"
import JwtVlidations from '../../middleware/jwt.js'
import { UserService } from './service.js'
import { UserValidations } from './validation.js'
import { APIError } from '../../models/APIError.js'

class UserController {

    router = Router()
    service = new UserService()
    validations = new UserValidations()
    
    constructor() {
        this.routes()
    }

    routes() {
        this.router.get('/detail', JwtVlidations.validateUser, this.validations.detail, this.detail)
    }

    detail = async (req, res) => {
        try {
            return res.send(await this.service.detail(req.user))
        } catch (error) {
            return new APIError(res).send()
        }
    }

}

export default new UserController().router