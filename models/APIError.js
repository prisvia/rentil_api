import { ResponseModel } from './response.js'

export class APIError {

    constructor(res, message) {
        this.message = message || 'Something went wrong'
        this.res = res
    }

    send = async () => {
        return this.res.status(500).send(new ResponseModel(false, this.message))
    }

}