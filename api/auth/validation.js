import Joi from 'joi'
import { ValidationError } from '../../models/validationError.js'
import HashService from '../../services/hash.js'
import { schemaReferences } from '../../constants/index.js'
import db from '../../db/db.js'

export class AuthValidations {

    signUp = async (req, res, next) => {

        try {
            const body = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().min(6).required(),
                role: Joi.number().required(),
                birthDate: Joi.date().optional(),
                gender: Joi.string().max(8).optional(),
                phone: Joi.string().optional(),
                email: Joi.string().email().required(),
                deleted: Joi.boolean().optional(),
                country: Joi.string().optional()
            })

            const result = body.validate(req.body)
            if (result.error) return new ValidationError(result.error.details[0].message, res).send()

            return next()
        } catch (error) {
            return new ValidationError('Auth validation error in signup function', res).send()
        }

    }

    signIn = async (req, res, next) => {
        try {
            const body = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().min(6).required()
            })

            const result = body.validate(req.body)
            if (result.error) return new ValidationError(result.error.details[0].message, res).send()

            const user = await db(schemaReferences.user).where({ username: req.body.username }).first()
            if (!user) return new ValidationError('Wrong credientals or not found')

            if (!HashService.check(req.body.password, user.password)) return new ValidationError('Wrong credientals')
            
            req.user = user
            return next()
        } catch (error) {
            return new ValidationError('Auth validation error in signIn function', res).send()
        }

    }


}