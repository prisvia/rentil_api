import { ResponseModel } from "../../models/response.js"

export class UserService {

    detail = async (user) => new ResponseModel(true, 'user detail', user)

}