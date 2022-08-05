import { Router } from "express"
import { RoleService } from './service.js'
import { RoleValidations } from './validation.js'
import { APIError } from '../../models/APIError.js'

class RolesController {

    router = Router()
    service = new RoleService()
    validations = new RoleValidations()

    constructor() {
        this.routes()
    }

    routes() {
        this.router.post('/', this.validations.create, this.create)
    }

    create = async (req, res) => {
        try {
            return res.send(await this.service.create(req.body))
        } catch (error) {
            new APIError(res).send()
        }
    }

}

export default new RolesController().router

