import { Router } from 'express'
import AuthController from './auth/index.js'
import RolesController from './roles/index.js'
import UserController from './users/index.js'

class AppRoutes {
    router = Router()

    constructor() {
        this.config()
    }

    config() {
        this.router.use('/auth', AuthController)
        this.router.use('/roles', RolesController)
        this.router.use('/users', UserController)
    }

}

export default new AppRoutes().router

