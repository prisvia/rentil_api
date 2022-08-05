import { Router } from "express"
import { AuthService } from './service.js'
import { AuthValidations } from './validation.js'
import { APIError } from '../../models/APIError.js'

class AuthController {

    router = Router() 
    service = new AuthService()
    validation = new AuthValidations()

    constructor() {
        this.config()
    }

    config() {
        this.router.post('/signup', this.validation.signUp, this.signUp)
        this.router.post('/signin', this.validation.signIn, this.signIn)
    }

    signUp = async (req, res) => {
        try {
            return res.send(await this.service.signUp(req.body))
        } catch (error) {
            return new APIError(res).send()
        }
    }

    signIn = async (req, res) => {
        try {
            return res.send(await this.service.signIn(req.user))
        } catch (error) {
            return new APIError(res).send()
        }
    }

}

export default new AuthController().router