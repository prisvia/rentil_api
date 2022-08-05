import { ResponseModel } from './response.js'

export class ValidationError {

    constructor(message, res) {
        this.message = message
        this.res = res
    }

    send = async () => {
        return this.res.status(400).send(new ResponseModel(false, this.message))
    }

}