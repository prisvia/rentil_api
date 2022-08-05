import { schemaReferences } from "../../constants/index.js"
import db from "../../db/db.js"
import { ResponseModel } from "../../models/response.js"

export class RoleService {
    
    create = async (body) => {
        const { name, permissions } = body
        const role = await db(schemaReferences.roles).insert({ name: name.toLowerCase(), permissions }).returning('id')
        return new ResponseModel(true, 'Role created', role)
    }

}