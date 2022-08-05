import express from 'express'
import cors from 'cors'
import * as fs from 'fs'
import { APIError } from './models/APIError.js'
import { ResponseModel } from './models/response.js'
import routes from './api/index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'

export const __filename = fileURLToPath(import.meta.url)

export const __dirname = path.dirname(__filename)

class Server {
    app = express()
    
    constructor() {
        this.config()
    }

    config() {
        this.app.use(cors())
        this.app.use(bodyParser())
        this.app.use(express.static('public'))
        this.app.get('/', (req, res) => {
            if (req.path === '/') return res.send(new ResponseModel(true, 'API working'))
            if (!req.path.includes('/api')) return new APIError(res, 'No no no').send()
        })
        if (!fs.existsSync('public')) {
            fs.mkdirSync('public')
        }
        if (!fs.existsSync('db')) {
            fs.mkdirSync('db')
        }
        this.app.use('/api', routes)
    }

}

export default new Server().app