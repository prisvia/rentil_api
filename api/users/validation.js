import joi from 'joi'
import { ValidationError } from "../../models/validationError.js"

export class UserValidations {

    detail = async (req, res, next) => {
        try {
            return next()
        } catch (error) {
            return new ValidationError('user get detail validation error', res).send()
        }
    }

}