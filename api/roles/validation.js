import joi from 'joi'
import { ValidationError } from '../../models/validationError.js'
import db from '../../db/db.js'
import { schemaReferences } from '../../constants/index.js'

export class RoleValidations {
    
    create = async (req, res, next) => {
        try {
            const body = joi.object({
                name: joi.string().required(),
                permissions: joi.array().required()
            })

            const result = body.validate(req.body)
            if (result.error) return new ValidationError(result.error.details[0].message, res).send()

            const existRole = await db(schemaReferences.roles).where({ name: req.body.name }).first()
            if (existRole) return new ValidationError('Role with given name already exists', res).send()
            
            return next()
        } catch (error) {
            return new ValidationError('Role create validation', res).send()
        }
    }

}